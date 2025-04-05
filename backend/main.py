import logging
import crud
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import engine, Base, get_db
from models import User, TransportOption, get_accommodations  
from schemas import UserCreate, UserResponse, TransportOptionCreate, TransportOptionResponse, AccommodationCreate, AccommodationResponse
from crud import create_user, authenticate_user, search_transport as search_transport_db, search_accommodation
from google_places import get_nearby_housing
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

logger.info("VISTOPIA: MAIN.PY IS RUNNING")

app = FastAPI()

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
    transport_type: str  # "flight", "train", "bus", etc.

@app.post("/search_transport/", response_model=list[TransportOptionResponse])
def search_transport(payload: TransportRequest, db: Session = Depends(get_db)):
    """Search for transport options based on origin, destination, and type."""
    results = search_transport_db(db, payload.origin, payload.destination, payload.transport_type)
    if not results:
        raise HTTPException(status_code=404, detail="No transport options found")
    return results

class AccommodationRequest(BaseModel):
    location: str
    budget: float

@app.post("/search_accommodation/", response_model=list[AccommodationResponse])
def search_accommodation(payload: AccommodationRequest, db: Session = Depends(get_db)):
    """Search for accommodations in a location within a budget."""
    results = search_accommodation(db, payload.location, payload.budget)
    if not results:
        raise HTTPException(status_code=404, detail="No accommodations found")
    return results

@app.post("/transport_options/", response_model=TransportOptionResponse)
def create_transport_option(
    transport: TransportOptionCreate, 
    db: Session = Depends(get_db)
):
    return crud.create_transport_option(db, transport)

# Force execution only when running directly
if __name__ == "__main__":
    for route in app.routes:
        logger.info(f"Registered route: {route.path}")

from database import engine, Base

Base.metadata.create_all(bind=engine)
print("Database tables created successfully!")

