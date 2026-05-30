from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Product

router = APIRouter()

@router.get("/search")
async def search_products(q: str, page: int = 1, db: Session = Depends(get_db)):
    """Search products"""
    limit = 10
    skip = (page - 1) * limit
    
    products = db.query(Product).filter(
        Product.name.ilike(f"%{q}%") | Product.brand.ilike(f"%{q}%")
    ).offset(skip).limit(limit).all()
    
    return {
        "items": [
            {
                "id": p.id,
                "name": p.name,
                "brand": p.brand,
                "description": p.description,
                "image_url": p.image_url,
                "price": p.price,
                "rating": p.rating,
                "reviews_count": p.reviews_count,
                "safe_ingredients": p.safe_ingredients,
                "acne_triggers": p.acne_triggers,
                "comedogenic_score": p.comedogenic_score
            }
            for p in products
        ],
        "page": page
    }

@router.get("/{product_id}")
async def get_product(product_id: str, db: Session = Depends(get_db)):
    """Get product details"""
    product = db.query(Product).filter(Product.id == product_id).first()
    
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    return {
        "id": product.id,
        "name": product.name,
        "brand": product.brand,
        "description": product.description,
        "image_url": product.image_url,
        "price": product.price,
        "rating": product.rating,
        "reviews_count": product.reviews_count,
        "ingredients": product.ingredients,
        "safe_ingredients": product.safe_ingredients,
        "acne_triggers": product.acne_triggers,
        "comedogenic_score": product.comedogenic_score
    }

@router.post("/{product_id}/analyze")
async def analyze_product(product_id: str, db: Session = Depends(get_db)):
    """Analyze product for user's skin type"""
    product = db.query(Product).filter(Product.id == product_id).first()
    
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    return {
        "product_id": product.id,
        "safe_ingredients": product.safe_ingredients,
        "acne_triggers": product.acne_triggers,
        "comedogenic_score": product.comedogenic_score,
        "recommendation": "Suitable for your skin type"
    }

@router.get("/{product_id}/similar")
async def get_similar_products(product_id: str, db: Session = Depends(get_db)):
    """Get similar products"""
    product = db.query(Product).filter(Product.id == product_id).first()
    
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    similar = db.query(Product).filter(
        Product.brand == product.brand,
        Product.id != product_id
    ).limit(5).all()
    
    return {
        "items": [
            {
                "id": p.id,
                "name": p.name,
                "brand": p.brand,
                "price": p.price,
                "rating": p.rating,
                "image_url": p.image_url
            }
            for p in similar
        ]
    }
