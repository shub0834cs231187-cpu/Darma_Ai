from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import SkinAnalysis, User
from app.utils import analyze_skin_image
import os
import tempfile
import base64
import requests

router = APIRouter()

class AnalyzeRequest(BaseModel):
    image_url: str
    user_id: str = "demo-user"

class ChatMessage(BaseModel):
    role: str
    content: str

class SkinChatRequest(BaseModel):
    message: str
    history: list[ChatMessage] = []

class SkinChatResponse(BaseModel):
    reply: str

GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")

def _build_gemini_contents(message: str, history: list[ChatMessage]):
    contents = []
    for item in history[-8:]:
        role = "model" if item.role == "assistant" else "user"
        if item.content.strip():
            contents.append({
                "role": role,
                "parts": [{"text": item.content.strip()}],
            })

    contents.append({
        "role": "user",
        "parts": [{"text": message.strip()}],
    })
    return contents

def ask_gemini_skin_assistant(message: str, history: list[ChatMessage]) -> str:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Gemini API key is not configured"
        )

    url = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent"
    payload = {
        "systemInstruction": {
            "parts": [{
                "text": (
                    "You are DermaAI, a friendly skincare assistant. Give practical, "
                    "general skincare guidance, routine suggestions, ingredient explanations, "
                    "and questions that help understand the user's skin concern. Keep answers "
                    "concise and easy to follow. Do not diagnose diseases or claim certainty "
                    "from text alone. For severe, painful, spreading, bleeding, infected, or "
                    "persistent symptoms, advise consulting a qualified dermatologist."
                )
            }]
        },
        "contents": _build_gemini_contents(message, history),
        "generationConfig": {
            "temperature": 0.7,
            "maxOutputTokens": 700,
        },
    }

    try:
        response = requests.post(
            url,
            headers={
                "x-goog-api-key": api_key,
                "Content-Type": "application/json",
            },
            json=payload,
            timeout=25,
        )
        response.raise_for_status()
        data = response.json()
        parts = data["candidates"][0]["content"]["parts"]
        return "\n".join(part.get("text", "") for part in parts).strip()
    except requests.RequestException as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Gemini request failed: {str(exc)}"
        )
    except (KeyError, IndexError, TypeError):
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Gemini returned an unexpected response"
        )

@router.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    """Upload skin image"""
    try:
        # Read file contents
        contents = await file.read()
        
        # Convert to base64 for storage
        base64_image = base64.b64encode(contents).decode('utf-8')
        image_url = f"data:image/jpeg;base64,{base64_image}"
        
        return {"image_url": image_url}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.post("/chat", response_model=SkinChatResponse)
async def skin_chat(data: SkinChatRequest):
    """Chat with the AI skin assistant"""
    if not data.message.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Message is required"
        )

    reply = ask_gemini_skin_assistant(data.message, data.history)
    return {"reply": reply}

@router.post("/analyze")
async def analyze_image(data: AnalyzeRequest, db: Session = Depends(get_db)):
    """Analyze skin image"""
    image_url = data.image_url
    user_id = data.user_id
    
    # Perform AI analysis
    analysis_result = analyze_skin_image(image_url)
    
    # Save to database
    analysis = SkinAnalysis(
        user_id=user_id,
        image_url=image_url,
        **analysis_result
    )
    db.add(analysis)
    db.commit()
    db.refresh(analysis)
    
    return {
        "id": analysis.id,
        "image_url": analysis.image_url,
        "skin_score": analysis.skin_score,
        "hydration_score": analysis.hydration_score,
        "acne_score": analysis.acne_score,
        "risk_score": analysis.risk_score,
        "skin_type": analysis.skin_type,
        "conditions": analysis.conditions,
        "recommendations": analysis.recommendations,
        "created_at": analysis.created_at
    }

@router.get("/history")
async def get_analysis_history(page: int = 1, limit: int = 10, db: Session = Depends(get_db)):
    """Get user's analysis history"""
    skip = (page - 1) * limit
    analyses = db.query(SkinAnalysis).offset(skip).limit(limit).all()
    
    return {
        "items": [
            {
                "id": a.id,
                "image_url": a.image_url,
                "skin_score": a.skin_score,
                "hydration_score": a.hydration_score,
                "acne_score": a.acne_score,
                "risk_score": a.risk_score,
                "skin_type": a.skin_type,
                "conditions": a.conditions,
                "created_at": a.created_at
            }
            for a in analyses
        ],
        "page": page,
        "limit": limit
    }

@router.get("/{analysis_id}")
async def get_analysis(analysis_id: str, db: Session = Depends(get_db)):
    """Get specific analysis"""
    analysis = db.query(SkinAnalysis).filter(SkinAnalysis.id == analysis_id).first()
    
    if not analysis:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis not found"
        )
    
    return {
        "id": analysis.id,
        "image_url": analysis.image_url,
        "skin_score": analysis.skin_score,
        "hydration_score": analysis.hydration_score,
        "acne_score": analysis.acne_score,
        "risk_score": analysis.risk_score,
        "skin_type": analysis.skin_type,
        "conditions": analysis.conditions,
        "recommendations": analysis.recommendations,
        "created_at": analysis.created_at
    }

@router.delete("/{analysis_id}")
async def delete_analysis(analysis_id: str, db: Session = Depends(get_db)):
    """Delete analysis"""
    analysis = db.query(SkinAnalysis).filter(SkinAnalysis.id == analysis_id).first()
    
    if not analysis:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis not found"
        )
    
    db.delete(analysis)
    db.commit()
    
    return {"message": "Analysis deleted"}
