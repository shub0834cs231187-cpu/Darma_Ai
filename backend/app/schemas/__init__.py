from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: str
    subscription_plan: str
    is_verified: bool
    created_at: datetime

    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: User

# Analysis Schemas
class SkinAnalysisBase(BaseModel):
    skin_score: float
    hydration_score: float
    acne_score: float
    risk_score: float
    skin_type: str
    conditions: List[str]
    recommendations: List[str]

class SkinAnalysisCreate(SkinAnalysisBase):
    image_url: str
    user_id: str

class SkinAnalysis(SkinAnalysisBase):
    id: str
    user_id: str
    image_url: str
    created_at: datetime

    class Config:
        from_attributes = True

# Product Schemas
class IngredientBase(BaseModel):
    name: str
    benefits: List[str]
    risks: List[str]
    comedogenic_level: float

class ProductBase(BaseModel):
    name: str
    brand: str
    description: str
    image_url: str
    price: float
    rating: float
    reviews_count: int
    comedogenic_score: float

class Product(ProductBase):
    id: str
    ingredients: List[IngredientBase]
    acne_triggers: List[str]
    safe_ingredients: List[str]

    class Config:
        from_attributes = True

# Recommendation Schemas
class RoutineProductBase(BaseModel):
    product_id: str
    product_name: str
    step: int
    time: str
    reason: str

class RecommendationBase(BaseModel):
    skin_type: str
    morning_routine: List[RoutineProductBase]
    night_routine: List[RoutineProductBase]
    weekly_routine: List[RoutineProductBase]

class Recommendation(RecommendationBase):
    id: str
    user_id: str
    created_at: datetime

    class Config:
        from_attributes = True

# Blog Schemas
class BlogBase(BaseModel):
    title: str
    content: str
    excerpt: str
    image_url: str
    category: str
    author: str

class Blog(BlogBase):
    id: str
    slug: str
    published_at: datetime
    views: int

    class Config:
        from_attributes = True

# Contact Schemas
class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class Contact(ContactCreate):
    id: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

# Pricing Schemas
class PricingPlan(BaseModel):
    id: str
    name: str
    price: float
    billing_period: str
    features: List[str]
    popular: bool

# Payment Schemas
class PaymentOrderCreate(BaseModel):
    plan_id: str

class PaymentVerify(BaseModel):
    order_id: str
    payment_id: str
    signature: str
