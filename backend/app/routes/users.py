from fastapi import APIRouter, Depends, File, UploadFile
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User

router = APIRouter()

@router.get("/profile")
async def get_profile(db: Session = Depends(get_db)):
    """Get user profile"""
    # In production, get from JWT token
    user_id = "demo-user"
    user = db.query(User).filter(User.id == user_id).first()
    
    if not user:
        return {"message": "User not found"}
    
    return {
        "id": user.id,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "avatar": user.avatar,
        "subscription_plan": user.subscription_plan,
        "created_at": user.created_at
    }

@router.put("/profile")
async def update_profile(data: dict, db: Session = Depends(get_db)):
    """Update user profile"""
    user_id = "demo-user"
    user = db.query(User).filter(User.id == user_id).first()
    
    if user:
        for key, value in data.items():
            if key in ["first_name", "last_name"]:
                setattr(user, key, value)
        db.commit()
    
    return {"message": "Profile updated"}

@router.post("/avatar")
async def update_avatar(file: UploadFile = File(...), db: Session = Depends(get_db)):
    """Update user avatar"""
    # Mock avatar upload
    return {"avatar_url": f"https://avatar.example.com/{file.filename}"}

@router.get("/notifications")
async def get_notifications(db: Session = Depends(get_db)):
    """Get user notifications"""
    return {
        "items": [
            {"id": "1", "message": "New product recommendation available", "read": False},
            {"id": "2", "message": "Your skin analysis is ready", "read": False},
        ]
    }

@router.put("/notifications/{notification_id}")
async def mark_notification_as_read(notification_id: str):
    """Mark notification as read"""
    return {"message": "Notification marked as read"}
