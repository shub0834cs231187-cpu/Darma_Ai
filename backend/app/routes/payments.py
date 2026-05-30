from fastapi import APIRouter, Depends

router = APIRouter()

@router.post("/create-order")
async def create_order(data: dict):
    """Create Razorpay order"""
    plan_id = data.get("plan_id")
    
    # Mock Razorpay order creation
    return {
        "order_id": f"order_{plan_id}",
        "amount": 9999,  # In smallest unit (paise)
        "currency": "INR"
    }

@router.post("/verify")
async def verify_payment(data: dict):
    """Verify Razorpay payment"""
    # Mock verification
    return {
        "message": "Payment verified successfully",
        "subscription_id": "sub_123"
    }

@router.get("/subscription")
async def get_subscription():
    """Get user's subscription"""
    return {
        "plan": "pro",
        "status": "active",
        "expires_at": "2025-12-31T23:59:59"
    }
