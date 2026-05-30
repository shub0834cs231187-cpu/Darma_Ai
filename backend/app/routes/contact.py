from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Contact
from app.schemas import ContactCreate

router = APIRouter()

@router.post("")
async def create_contact(contact_data: ContactCreate, db: Session = Depends(get_db)):
    """Submit contact form"""
    contact = Contact(
        name=contact_data.name,
        email=contact_data.email,
        subject=contact_data.subject,
        message=contact_data.message
    )
    db.add(contact)
    db.commit()
    db.refresh(contact)
    
    return {
        "message": "Message sent successfully",
        "id": contact.id
    }

@router.get("")
async def get_contacts(db: Session = Depends(get_db)):
    """Get all contact messages (admin only)"""
    contacts = db.query(Contact).all()
    return {
        "items": [
            {
                "id": c.id,
                "name": c.name,
                "email": c.email,
                "subject": c.subject,
                "message": c.message,
                "status": c.status,
                "created_at": c.created_at
            }
            for c in contacts
        ]
    }
