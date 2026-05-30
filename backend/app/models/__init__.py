from sqlalchemy import Column, String, Float, DateTime, Boolean, Integer, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    password_hash = Column(String)
    avatar = Column(String, nullable=True)
    subscription_plan = Column(String, default="free")
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    analyses = relationship("SkinAnalysis", back_populates="user")
    recommendations = relationship("Recommendation", back_populates="user")

class SkinAnalysis(Base):
    __tablename__ = "skin_analyses"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"))
    image_url = Column(String)
    skin_score = Column(Float)
    hydration_score = Column(Float)
    acne_score = Column(Float)
    risk_score = Column(Float)
    skin_type = Column(String)
    conditions = Column(JSON, default=[])
    recommendations = Column(JSON, default=[])
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="analyses")

class Product(Base):
    __tablename__ = "products"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String)
    brand = Column(String)
    description = Column(Text)
    image_url = Column(String)
    price = Column(Float)
    rating = Column(Float, default=0)
    reviews_count = Column(Integer, default=0)
    ingredients = Column(JSON, default={})
    acne_triggers = Column(JSON, default=[])
    safe_ingredients = Column(JSON, default=[])
    comedogenic_score = Column(Float, default=0)

class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"))
    skin_type = Column(String)
    morning_routine = Column(JSON, default={})
    night_routine = Column(JSON, default={})
    weekly_routine = Column(JSON, default={})
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="recommendations")

class Blog(Base):
    __tablename__ = "blogs"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String)
    slug = Column(String, unique=True, index=True)
    content = Column(Text)
    excerpt = Column(String)
    image_url = Column(String)
    category = Column(String)
    author = Column(String)
    published_at = Column(DateTime, default=datetime.utcnow)
    views = Column(Integer, default=0)

class Contact(Base):
    __tablename__ = "contacts"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String)
    email = Column(String)
    subject = Column(String)
    message = Column(Text)
    status = Column(String, default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)

class FAQ(Base):
    __tablename__ = "faqs"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    question = Column(String)
    answer = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"))
    plan = Column(String)
    razorpay_subscription_id = Column(String)
    status = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime)
