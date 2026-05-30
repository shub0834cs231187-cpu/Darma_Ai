import os
import json
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
import cloudinary
import cloudinary.uploader

# Security
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None

# Cloudinary
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)

def upload_file_to_cloudinary(file_path: str, folder: str = "dermaai"):
    try:
        result = cloudinary.uploader.upload(
            file_path,
            folder=folder,
            resource_type="auto"
        )
        return result["secure_url"]
    except Exception as e:
        print(f"Cloudinary upload error: {e}")
        return None

# Razorpay
RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET")

# AI Model helper (mock)
def analyze_skin_image(image_url: str):
    """Mock AI analysis - replace with actual AI model"""
    import random
    
    # Generate varied results based on image
    skin_types = ["dry", "oily", "combination", "sensitive", "normal"]
    conditions_list = [
        ["slight_acne", "oily_forehead"],
        ["dryness", "sensitivity"],
        ["acne", "oily_t_zone"],
        ["wrinkles", "age_spots"],
        ["redness", "rosacea"],
        ["blackheads", "enlarged_pores"],
        ["pigmentation", "sun_damage"],
        ["dehydration"],
    ]
    
    # Random but realistic scores
    skin_score = round(random.uniform(4.5, 9.5), 1)
    hydration_score = round(random.uniform(3.0, 9.0), 1)
    acne_score = round(random.uniform(1.0, 8.0), 1)
    risk_score = round(random.uniform(0.5, 7.0), 1)
    
    skin_type = random.choice(skin_types)
    conditions = random.choice(conditions_list)
    
    return {
        "skin_score": skin_score,
        "hydration_score": hydration_score,
        "acne_score": acne_score,
        "risk_score": risk_score,
        "skin_type": skin_type,
        "conditions": conditions,
        "recommendations": ["gentle_cleanser", "moisturizer"]
    }

def generate_recommendations(skin_type: str):
    """Generate personalized skincare routines"""
    recommendations_map = {
        "dry": {
            "morning_routine": [
                {"product_id": "1", "product_name": "Hydrating Cleanser", "step": 1, "time": "7:00 AM", "reason": "Gentle cleansing without stripping"},
                {"product_id": "2", "product_name": "Hydrating Toner", "step": 2, "time": "7:05 AM", "reason": "Hydration boost"},
                {"product_id": "3", "product_name": "Rich Moisturizer", "step": 3, "time": "7:10 AM", "reason": "Deep hydration"},
            ],
            "night_routine": [
                {"product_id": "1", "product_name": "Hydrating Cleanser", "step": 1, "time": "9:00 PM", "reason": "Remove impurities"},
                {"product_id": "4", "product_name": "Night Cream", "step": 2, "time": "9:10 PM", "reason": "Intense overnight hydration"},
            ],
            "weekly_routine": [
                {"product_id": "5", "product_name": "Hydrating Mask", "step": 1, "time": "Saturday", "reason": "Deep hydration treatment"},
            ]
        },
        "oily": {
            "morning_routine": [
                {"product_id": "6", "product_name": "Foaming Cleanser", "step": 1, "time": "7:00 AM", "reason": "Remove excess oil"},
                {"product_id": "7", "product_name": "Mattifying Toner", "step": 2, "time": "7:05 AM", "reason": "Balance oil production"},
                {"product_id": "8", "product_name": "Oil-Free Moisturizer", "step": 3, "time": "7:10 AM", "reason": "Lightweight hydration"},
            ],
            "night_routine": [
                {"product_id": "6", "product_name": "Foaming Cleanser", "step": 1, "time": "9:00 PM", "reason": "Deep cleansing"},
                {"product_id": "9", "product_name": "Lightweight Gel", "step": 2, "time": "9:10 PM", "reason": "Non-greasy care"},
            ],
            "weekly_routine": [
                {"product_id": "10", "product_name": "Clay Mask", "step": 1, "time": "Sunday", "reason": "Oil control treatment"},
            ]
        },
        "combination": {
            "morning_routine": [
                {"product_id": "11", "product_name": "Balanced Cleanser", "step": 1, "time": "7:00 AM", "reason": "Gentle yet effective"},
                {"product_id": "12", "product_name": "Balancing Toner", "step": 2, "time": "7:05 AM", "reason": "pH balance"},
                {"product_id": "13", "product_name": "Balanced Moisturizer", "step": 3, "time": "7:10 AM", "reason": "Hydration without heaviness"},
            ],
            "night_routine": [
                {"product_id": "11", "product_name": "Balanced Cleanser", "step": 1, "time": "9:00 PM", "reason": "Thorough cleansing"},
                {"product_id": "14", "product_name": "Night Moisturizer", "step": 2, "time": "9:10 PM", "reason": "Balanced care"},
            ],
            "weekly_routine": [
                {"product_id": "15", "product_name": "Exfoliating Scrub", "step": 1, "time": "Wednesday", "reason": "Gentle exfoliation"},
            ]
        }
    }
    return recommendations_map.get(skin_type, recommendations_map["combination"])
