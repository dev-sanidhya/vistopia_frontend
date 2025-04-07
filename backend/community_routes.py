from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import User, CommunityPost
from pydantic import BaseModel
from datetime import datetime
from typing import List
from models import CommunityPost

router = APIRouter()

class CommunityPostCreate(BaseModel):
    city: str
    content: str
    user_email: str

class CommunityPostOut(BaseModel):
    id: int
    city: str
    content: str
    user_email: str
    created_at: datetime

    class Config:
        orm_mode = True

@router.post("/community/posts", response_model=CommunityPostOut)
def create_post(post: CommunityPostCreate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == post.user_email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    new_post = CommunityPost(
        city=post.city,
        content=post.content,
        user_email=post.user_email
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post

@router.get("/community/posts/{city}", response_model=List[CommunityPostOut])
def get_posts_by_city(city: str, db: Session = Depends(get_db)):
    posts = db.query(CommunityPost).filter(CommunityPost.city == city).order_by(CommunityPost.created_at.desc()).all()
    return posts
