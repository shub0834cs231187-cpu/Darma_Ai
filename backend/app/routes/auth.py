from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta
from app.database import get_db
from app.models import User
from app.schemas import UserCreate, UserLogin, User as UserSchema, TokenResponse
from app.utils import hash_password, verify_password, create_access_token
from pydantic import EmailStr

router = APIRouter()

@router.post("/register", response_model=TokenResponse)
async def register(user_data: UserCreate, db: Session = Depends(get_db)):
    """Register a new user"""
    # Check if user exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create user
    user = User(
        email=user_data.email,
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        password_hash=hash_password(user_data.password),
        is_verified=True  # Auto-verify for demo
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    
    # Create token
    access_token = create_access_token(data={"sub": user.id})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "subscription_plan": user.subscription_plan,
            "is_verified": user.is_verified,
            "created_at": user.created_at
        }
    }

@router.post("/login", response_model=TokenResponse)
async def login(credentials: UserLogin, db: Session = Depends(get_db)):
    """Login user"""
    user = db.query(User).filter(User.email == credentials.email).first()
    
    if not user or not verify_password(credentials.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    access_token = create_access_token(data={"sub": user.id})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "subscription_plan": user.subscription_plan,
            "is_verified": user.is_verified,
            "created_at": user.created_at
        }
    }

@router.post("/google-login", response_model=TokenResponse)
async def google_login(token: dict, db: Session = Depends(get_db)):
    """Login with Google"""
    # Verify Google token and get user info
    # This is a simplified version - implement actual Google OAuth
    email = token.get("email")
    first_name = token.get("first_name", "")
    
    user = db.query(User).filter(User.email == email).first()
    
    if not user:
        user = User(
            email=email,
            first_name=first_name,
            last_name="",
            password_hash="",  # No password for OAuth
            is_verified=True
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    
    access_token = create_access_token(data={"sub": user.id})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "subscription_plan": user.subscription_plan,
            "is_verified": user.is_verified,
            "created_at": user.created_at
        }
    }

@router.get("/me")
async def get_me(db: Session = Depends(get_db)):
    """Get current user"""
    # This would typically use dependency injection with current user
    return {"message": "Get current user endpoint"}
