from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
import os

load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="DermaAI API",
    description="AI-powered skin analysis and recommendation engine",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import routes
from app.routes import auth, users, analysis, products, recommendations, blog, contact, payments, admin

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(analysis.router, prefix="/analysis", tags=["Analysis"])
app.include_router(products.router, prefix="/products", tags=["Products"])
app.include_router(recommendations.router, prefix="/recommendations", tags=["Recommendations"])
app.include_router(blog.router, prefix="/blog", tags=["Blog"])
app.include_router(contact.router, prefix="/contact", tags=["Contact"])
app.include_router(payments.router, prefix="/payments", tags=["Payments"])
app.include_router(admin.router, prefix="/admin", tags=["Admin"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to DermaAI API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
