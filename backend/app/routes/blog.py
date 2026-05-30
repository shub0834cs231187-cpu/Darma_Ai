from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Blog

router = APIRouter()

@router.get("/categories")
async def get_categories(db: Session = Depends(get_db)):
    """Get all blog categories"""
    categories = db.query(Blog.category).distinct().all()
    return [c[0] for c in categories if c[0]]

@router.get("")
async def get_blogs(page: int = 1, limit: int = 10, category: str = None, db: Session = Depends(get_db)):
    """Get blog posts"""
    skip = (page - 1) * limit
    query = db.query(Blog)
    
    if category:
        query = query.filter(Blog.category == category)
    
    blogs = query.order_by(Blog.published_at.desc()).offset(skip).limit(limit).all()
    
    return {
        "items": [
            {
                "id": b.id,
                "title": b.title,
                "slug": b.slug,
                "excerpt": b.excerpt,
                "image_url": b.image_url,
                "category": b.category,
                "author": b.author,
                "published_at": b.published_at,
                "views": b.views
            }
            for b in blogs
        ],
        "page": page,
        "limit": limit
    }

@router.get("/{slug}")
async def get_blog(slug: str, db: Session = Depends(get_db)):
    """Get blog post by slug"""
    blog = db.query(Blog).filter(Blog.slug == slug).first()
    
    if not blog:
        return {"error": "Blog not found"}
    
    # Increment views
    blog.views += 1
    db.commit()
    
    return {
        "id": blog.id,
        "title": blog.title,
        "slug": blog.slug,
        "content": blog.content,
        "excerpt": blog.excerpt,
        "image_url": blog.image_url,
        "category": blog.category,
        "author": blog.author,
        "published_at": blog.published_at,
        "views": blog.views
    }
