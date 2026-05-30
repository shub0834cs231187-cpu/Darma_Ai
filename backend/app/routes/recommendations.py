from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Recommendation
from app.utils import generate_recommendations

router = APIRouter()

@router.post("/generate")
async def generate_recommendations_endpoint(data: dict, db: Session = Depends(get_db)):
    """Generate personalized recommendations"""
    skin_type = data.get("skin_type", "combination")
    user_id = data.get("user_id", "demo-user")
    
    recommendations_data = generate_recommendations(skin_type)
    
    # Save to database
    recommendation = Recommendation(
        user_id=user_id,
        skin_type=skin_type,
        morning_routine=recommendations_data["morning_routine"],
        night_routine=recommendations_data["night_routine"],
        weekly_routine=recommendations_data["weekly_routine"]
    )
    db.add(recommendation)
    db.commit()
    db.refresh(recommendation)
    
    return {
        "id": recommendation.id,
        "skin_type": recommendation.skin_type,
        "morning_routine": recommendation.morning_routine,
        "night_routine": recommendation.night_routine,
        "weekly_routine": recommendation.weekly_routine,
        "created_at": recommendation.created_at
    }

@router.get("")
async def get_recommendations(db: Session = Depends(get_db)):
    """Get user's current recommendations"""
    # In production, get user from JWT token
    user_id = "demo-user"
    
    recommendation = db.query(Recommendation).filter(
        Recommendation.user_id == user_id
    ).order_by(Recommendation.created_at.desc()).first()
    
    if not recommendation:
        # Generate default
        recommendations_data = generate_recommendations("combination")
        return {
            "morning_routine": recommendations_data["morning_routine"],
            "night_routine": recommendations_data["night_routine"],
            "weekly_routine": recommendations_data["weekly_routine"]
        }
    
    return {
        "id": recommendation.id,
        "morning_routine": recommendation.morning_routine,
        "night_routine": recommendation.night_routine,
        "weekly_routine": recommendation.weekly_routine,
        "created_at": recommendation.created_at
    }

@router.get("/routine")
async def get_skin_routine(skin_type: str):
    """Get routine for specific skin type"""
    recommendations_data = generate_recommendations(skin_type)
    return recommendations_data
