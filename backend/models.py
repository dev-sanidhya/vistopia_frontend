from sqlalchemy import Column, Integer, String, Float, DateTime, JSON, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)

    # Relationship to community posts
    posts = relationship("CommunityPost", back_populates="user")


class get_accommodations(Base): 
    __tablename__ = "accomodations"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    address = Column(String, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    rating = Column(Float, nullable=True)
    total_reviews = Column(Integer, nullable=True)
    price = Column(Integer, nullable=True)  # Google API might not always provide price
    amenities = Column(JSON, nullable=True)  # Store as JSON (e.g., ["WiFi", "AC"])
    last_updated = Column(DateTime, default=datetime.utcnow)


class TransportOption(Base): 
    __tablename__ = "transport_options"

    id = Column(Integer, primary_key=True, autoincrement=True)
    origin = Column(String, nullable=False)
    destination = Column(String, nullable=False)
    transport_type = Column(String, nullable=False)
    mode = Column(String, nullable=False)
    price = Column(Float, nullable=True)
    duration = Column(String, nullable=True)  
    distance = Column(Float, nullable=True)
    last_updated = Column(DateTime, default=datetime.utcnow)


class CommunityPost(Base):
    __tablename__ = "community_posts"

    id = Column(Integer, primary_key=True, index=True)
    city = Column(String, index=True)
    content = Column(Text, nullable=False)
    user_email = Column(String, ForeignKey("users.username"))
    created_at = Column(DateTime, default=datetime.utcnow)

    # Link back to the user who created the post
    user = relationship("User", back_populates="posts")