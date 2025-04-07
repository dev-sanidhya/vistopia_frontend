import logging
import crud
import openai
from fastapi import FastAPI, Depends, HTTPException
from fastapi import FastAPI, Depends, HTTPException
from fastapi.routing import APIRouter
from sqlalchemy.orm import Session
from database import engine, Base, get_db
from models import User, TransportOption, get_accommodations  
from schemas import UserCreate, UserResponse, TransportOptionCreate, TransportOptionResponse, AccommodationCreate, AccommodationResponse
from crud import create_user, authenticate_user
from google_places import get_nearby_housing, geocode_location, get_transport_routes
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from typing import List

router = APIRouter()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from community_routes import router as community_router
app.include_router(community_router)

# CORS setup (modify as needed)

app.include_router(community_router)  # ← add this line

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

logger.info("VISTOPIA: MAIN.PY IS RUNNING")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create DB tables
Base.metadata.create_all(bind=engine)

@app.post("/signup/", response_model=UserResponse)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already taken")

    new_user = create_user(db, user.username, user.password)
    return new_user

@app.post("/login/")
def login(user: UserCreate, db: Session = Depends(get_db)):
    db_user = authenticate_user(db, user.username, user.password)
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid username or password")

    return {"message": "Login successful", "username": db_user.username}

class TransportRequest(BaseModel):
    origin: str
    destination: str

# search_transport endpoint
@app.post("/search_transport/", response_model=list[TransportOptionResponse])
def search_transport(payload: TransportRequest):
    all_modes = ["driving", "transit", "walking", "bicycling"]
    all_options = []

    for mode in all_modes:
        routes = get_transport_routes(payload.origin, payload.destination, mode)
        for route in routes:
            distance = route["distance"]
            if distance and distance > 20 and mode in ["walking", "bicycling"]:
                continue  # Skip long-distance walking/bicycling
            all_options.append({
                "origin": payload.origin,
                "destination": payload.destination,
                "transport_type": mode,
                "mode": mode,
                "price": route["price"],
                "duration": route["duration"],
                "distance": distance
            })

    if not all_options:
        raise HTTPException(status_code=404, detail="No routes found")
    
    return [{"id": idx, **opt} for idx, opt in enumerate(all_options)]

class AccommodationRequest(BaseModel):
    location: str
    budget: float

# Update the imports
from google_places import get_nearby_housing, geocode_location

@app.post("/search_accommodation/", response_model=list[AccommodationResponse])
def search_accommodation(payload: AccommodationRequest):
    # Geocode the location to get coordinates
    lat_lng = geocode_location(payload.location)
    if not lat_lng:
        raise HTTPException(status_code=400, detail="Invalid location")
    lat, lng = lat_lng
    
    # Fetch nearby housing from Google Places API
    places = get_nearby_housing(lat, lng)
    print("Total places fetched:", len(places))  # DEBUG

    # Print all names and their prices
    for place in places:
        print(f"{place['name']} - price: {place.get('price')}")  # DEBUG

    if not places:
        raise HTTPException(status_code=404, detail="No accommodations found")
    
    # Filter by price_level (budget)
    filtered = places
    print("Filtered (within budget) places:", len(filtered))  # DEBUG
    
    # Map to AccommodationResponse schema
    PRICE_LEVEL_MAP = {
        0: 30,   # Free or unknown
        1: 50,   # Inexpensive
        2: 100,  # Moderate
        3: 150,  # Expensive
        4: 200   # Very Expensive
    }

    results = []
    for place in filtered:
        price_level = place.get("price_level", 0) 
        mapped_price = PRICE_LEVEL_MAP.get(price_level, 30)
        results.append({
            "id": place["place_id"],
            "name": place["name"],
            "location": place["address"],
            "price": mapped_price,
            "rating": place.get("rating")
    })

    return results


@app.post("/transport_options/", response_model=TransportOptionResponse)
def create_transport_option(
    transport: TransportOptionCreate, 
    db: Session = Depends(get_db)
):
    return crud.create_transport_option(db, transport)

client = openai.OpenAI(
    api_key="w43Di8Ovw4XDnjdwwpo+aMOxw5HDuMK4wpRL",
    base_url="https://api.function.network/v1",
)

class ItineraryRequest(BaseModel):
    location: str
    startdate: str
    enddate: str

@app.post("/generate-itinerary")
async def generate_itinerary(data: ItineraryRequest):
    prompt = f"""
    I am a traveler visiting {data.location} for the duration of {data.startdate} to {data.enddate}. Please create a detailed, realistic, and enriching itinerary in **Markdown format. It should include:

    - A daily breakdown (Day 1, Day 2, etc.)
    - Activities for morning, afternoon, and evening
    - A mix of must-visit landmarks, local food experiences, and hidden gems
    - Suggestions for local transportation if needed
    - Any useful cultural insights or local tips
    - The output should be clean and structured so it looks good when rendered as Markdown
    """

    try:
        response = client.chat.completions.create(
            model="meta/llama-3.1-8b-instruct-awq",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert travel planner and cultural guide. You create amazing, memorable travel experiences."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )
        itinerary_md = response.choices[0].message.content
        return {"markdown": itinerary_md}
    
    except Exception as e:
        return {"error": str(e)}

# Force execution only when running directly
if __name__ == "__main__":
    for route in app.routes:
        logger.info(f"Registered route: {route.path}")

print("Database tables created successfully!")