from sqlalchemy.orm import Session
from models import User, get_accommodations as Accommodation, TransportOption 
from passlib.context import CryptContext
from schemas import AccommodationCreate, TransportOptionCreate

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_user(db: Session, username: str, password: str):
    hashed_password = hash_password(password)
    user = User(username=username, password=hashed_password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def authenticate_user(db: Session, username: str, password: str):
    user = db.query(User).filter(User.username == username).first()
    if not user or not verify_password(password, user.password):
        return None
    return user

def create_accommodation(db: Session, accommodation: AccommodationCreate):
    db_accommodation = Accommodation(**accommodation.dict()) 
    db.add(db_accommodation)
    db.commit()
    db.refresh(db_accommodation)
    return db_accommodation

def get_accommodations(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Accommodation).offset(skip).limit(limit).all()

def create_transport_option(db: Session, transport: TransportOptionCreate):
    db_transport = TransportOption(**transport.dict())
    db.add(db_transport)
    db.commit()
    db.refresh(db_transport)
    return db_transport

def get_transport_options(db: Session, origin: str, destination: str):
    options = db.query(TransportOption).filter(
        TransportOption.origin == origin,
        TransportOption.destination == destination
    ).all()

    filtered = []
    for option in options:
        if option.distance is not None and option.distance > 20:
            if option.mode.lower() in ["walking", "bicycling"]:
                continue
        filtered.append(option)
    
    return filtered