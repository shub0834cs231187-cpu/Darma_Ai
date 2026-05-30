from fastapi import APIRouter, Depends, File, UploadFile
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, Product, FAQ

router = APIRouter()

@router.get("/analytics")
async def get_analytics(db: Session = Depends(get_db)):
    """Get platform analytics"""
    total_users = db.query(User).count()
    total_products = db.query(Product).count()
    
    return {
        "total_users": total_users,
        "total_products": total_products,
        "active_users": total_users * 0.7,
        "revenue": 50000
    }

@router.get("/users")
async def get_users(page: int = 1, limit: int = 10, db: Session = Depends(get_db)):
    """Get all users"""
    skip = (page - 1) * limit
    users = db.query(User).offset(skip).limit(limit).all()
    
    return {
        "items": [
            {
                "id": u.id,
                "email": u.email,
                "first_name": u.first_name,
                "subscription_plan": u.subscription_plan,
                "created_at": u.created_at
            }
            for u in users
        ]
    }

@router.put("/users/{user_id}")
async def update_user(user_id: str, data: dict, db: Session = Depends(get_db)):
    """Update user"""
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        for key, value in data.items():
            setattr(user, key, value)
        db.commit()
    return {"message": "User updated"}

@router.delete("/users/{user_id}")
async def delete_user(user_id: str, db: Session = Depends(get_db)):
    """Delete user"""
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        db.delete(user)
        db.commit()
    return {"message": "User deleted"}

@router.get("/products")
async def get_products(page: int = 1, limit: int = 10, db: Session = Depends(get_db)):
    """Get all products"""
    skip = (page - 1) * limit
    products = db.query(Product).offset(skip).limit(limit).all()
    
    return {
        "items": [
            {
                "id": p.id,
                "name": p.name,
                "brand": p.brand,
                "price": p.price,
                "rating": p.rating
            }
            for p in products
        ]
    }

@router.post("/products")
async def create_product(data: dict, db: Session = Depends(get_db)):
    """Create product"""
    product = Product(**data)
    db.add(product)
    db.commit()
    return {"id": product.id}

@router.put("/products/{product_id}")
async def update_product(product_id: str, data: dict, db: Session = Depends(get_db)):
    """Update product"""
    product = db.query(Product).filter(Product.id == product_id).first()
    if product:
        for key, value in data.items():
            setattr(product, key, value)
        db.commit()
    return {"message": "Product updated"}

@router.delete("/products/{product_id}")
async def delete_product(product_id: str, db: Session = Depends(get_db)):
    """Delete product"""
    product = db.query(Product).filter(Product.id == product_id).first()
    if product:
        db.delete(product)
        db.commit()
    return {"message": "Product deleted"}

@router.get("/faq")
async def get_faqs(db: Session = Depends(get_db)):
    """Get all FAQs"""
    faqs = db.query(FAQ).all()
    return {"items": [{"id": f.id, "question": f.question, "answer": f.answer} for f in faqs]}

@router.post("/faq")
async def create_faq(data: dict, db: Session = Depends(get_db)):
    """Create FAQ"""
    faq = FAQ(**data)
    db.add(faq)
    db.commit()
    return {"id": faq.id}

@router.put("/faq/{faq_id}")
async def update_faq(faq_id: str, data: dict, db: Session = Depends(get_db)):
    """Update FAQ"""
    faq = db.query(FAQ).filter(FAQ.id == faq_id).first()
    if faq:
        for key, value in data.items():
            setattr(faq, key, value)
        db.commit()
    return {"message": "FAQ updated"}

@router.delete("/faq/{faq_id}")
async def delete_faq(faq_id: str, db: Session = Depends(get_db)):
    """Delete FAQ"""
    faq = db.query(FAQ).filter(FAQ.id == faq_id).first()
    if faq:
        db.delete(faq)
        db.commit()
    return {"message": "FAQ deleted"}
