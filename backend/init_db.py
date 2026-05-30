from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database import Base
from app.models import User, Product, Blog, FAQ
from app.utils import hash_password
import os

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./dermaai.db")

def init_db():
    """Initialize database and seed data"""
    # Create engine with SQLite-specific settings
    if DATABASE_URL.startswith("sqlite"):
        engine = create_engine(
            DATABASE_URL,
            connect_args={"check_same_thread": False}
        )
    else:
        engine = create_engine(DATABASE_URL)
    
    # Create tables
    Base.metadata.create_all(bind=engine)
    print("✓ Tables created successfully")
    
    # Seed data
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()
    
    # Check if data already exists
    if db.query(User).first():
        print("✓ Database already seeded")
        db.close()
        return
    
    # Create demo users
    users = [
        User(
            email="user@example.com",
            first_name="John",
            last_name="Doe",
            password_hash=hash_password("password123"),
            subscription_plan="pro",
            is_verified=True
        ),
        User(
            email="admin@example.com",
            first_name="Admin",
            last_name="User",
            password_hash=hash_password("admin123"),
            subscription_plan="enterprise",
            is_verified=True
        ),
    ]
    db.add_all(users)
    print("✓ Users seeded")
    
    # Create demo products
    products = [
        Product(
            name="Hydrating Cleanser",
            brand="CeraVe",
            description="Gentle hydrating facial cleanser",
            image_url="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500",
            price=12.99,
            rating=4.5,
            reviews_count=250,
            safe_ingredients=["water", "glycerin", "ceramide"],
            acne_triggers=[],
            comedogenic_score=1.0
        ),
        Product(
            name="Retinol Night Cream",
            brand="The Ordinary",
            description="Powerful retinol treatment cream",
            image_url="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500",
            price=8.99,
            rating=4.2,
            reviews_count=180,
            safe_ingredients=["retinol", "squalane"],
            acne_triggers=["potential_irritant"],
            comedogenic_score=2.0
        ),
        Product(
            name="Oil-Free Moisturizer",
            brand="Neutrogena",
            description="Lightweight non-comedogenic moisturizer",
            image_url="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500",
            price=9.99,
            rating=4.1,
            reviews_count=320,
            safe_ingredients=["glycerin", "water"],
            acne_triggers=[],
            comedogenic_score=0.5
        ),
    ]
    db.add_all(products)
    print("✓ Products seeded")
    
    # Create demo blogs
    blogs = [
        Blog(
            title="10 Tips for Glowing Skin",
            slug="10-tips-for-glowing-skin",
            content="<p>Skincare is more than just a routine...</p>",
            excerpt="Learn the best practices for achieving radiant, glowing skin.",
            image_url="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800",
            category="skincare",
            author="Dr. Sarah Mitchell",
            views=0
        ),
        Blog(
            title="Understanding Your Skin Type",
            slug="understanding-your-skin-type",
            content="<p>There are five main skin types...</p>",
            excerpt="Discover your skin type and learn how to care for it properly.",
            image_url="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800",
            category="education",
            author="Dr. James Wilson",
            views=0
        ),
    ]
    db.add_all(blogs)
    print("✓ Blogs seeded")
    
    # Create demo FAQs
    faqs = [
        FAQ(
            question="How often should I use the skin analysis?",
            answer="We recommend using the skin analysis every 4-6 weeks to track your skin's progress."
        ),
        FAQ(
            question="Is my data private?",
            answer="Yes, we use enterprise-grade encryption and comply with GDPR and HIPAA regulations."
        ),
    ]
    db.add_all(faqs)
    print("✓ FAQs seeded")
    
    db.commit()
    db.close()
    print("✓ Database initialization complete!")

if __name__ == "__main__":
    init_db()
