# API Reference

## Authentication Endpoints

### Register
```
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "first_name": "John",
  "last_name": "Doe"
}

Response:
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer",
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "subscription_plan": "free",
    "is_verified": true,
    "created_at": "2024-01-01T00:00:00"
  }
}
```

### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: Same as register
```

### Google Login
```
POST /auth/google-login
Content-Type: application/json

{
  "token": "google-id-token"
}
```

## Analysis Endpoints

### Upload Image
```
POST /analysis/upload
Content-Type: multipart/form-data

file: [binary image file]

Response:
{
  "image_url": "https://cloudinary-url.com/image.jpg"
}
```

### Analyze Image
```
POST /analysis/analyze
Content-Type: application/json

{
  "image_url": "https://cloudinary-url.com/image.jpg",
  "user_id": "user-123"
}

Response:
{
  "id": "analysis-123",
  "image_url": "https://...",
  "skin_score": 7.5,
  "hydration_score": 6.8,
  "acne_score": 4.2,
  "risk_score": 3.5,
  "skin_type": "combination",
  "conditions": ["slight_acne"],
  "recommendations": ["gentle_cleanser"],
  "created_at": "2024-01-01T00:00:00"
}
```

### Get Analysis History
```
GET /analysis/history?page=1&limit=10

Response:
{
  "items": [
    { /* analysis object */ }
  ],
  "page": 1,
  "limit": 10
}
```

### Get Specific Analysis
```
GET /analysis/{analysis_id}

Response: { /* analysis object */ }
```

### Delete Analysis
```
DELETE /analysis/{analysis_id}

Response:
{
  "message": "Analysis deleted"
}
```

## Product Endpoints

### Search Products
```
GET /products/search?q=retinol&page=1

Response:
{
  "items": [
    {
      "id": "product-123",
      "name": "Retinol Night Cream",
      "brand": "The Ordinary",
      "description": "...",
      "image_url": "...",
      "price": 8.99,
      "rating": 4.2,
      "reviews_count": 180,
      "safe_ingredients": ["retinol"],
      "acne_triggers": [],
      "comedogenic_score": 2.0
    }
  ],
  "page": 1
}
```

### Get Product Details
```
GET /products/{product_id}

Response: { /* product object */ }
```

### Analyze Product
```
POST /products/{product_id}/analyze

Response:
{
  "product_id": "product-123",
  "safe_ingredients": ["ingredient1"],
  "acne_triggers": [],
  "comedogenic_score": 2.0,
  "recommendation": "Suitable for your skin type"
}
```

### Get Similar Products
```
GET /products/{product_id}/similar

Response:
{
  "items": [ /* similar products */ ]
}
```

## Recommendations Endpoints

### Generate Recommendations
```
POST /recommendations/generate
Content-Type: application/json

{
  "skin_type": "combination",
  "user_id": "user-123"
}

Response:
{
  "id": "recommendation-123",
  "skin_type": "combination",
  "morning_routine": [
    {
      "product_id": "product-123",
      "product_name": "Cleanser",
      "step": 1,
      "time": "7:00 AM",
      "reason": "Gentle cleansing"
    }
  ],
  "night_routine": [ /* ... */ ],
  "weekly_routine": [ /* ... */ ],
  "created_at": "2024-01-01T00:00:00"
}
```

### Get User Recommendations
```
GET /recommendations

Response: { /* recommendation object */ }
```

### Get Routine by Skin Type
```
GET /recommendations/routine?skin_type=dry

Response:
{
  "morning_routine": [ /* ... */ ],
  "night_routine": [ /* ... */ ],
  "weekly_routine": [ /* ... */ ]
}
```

## Blog Endpoints

### Get Blogs
```
GET /blog?page=1&limit=10&category=skincare

Response:
{
  "items": [
    {
      "id": "blog-123",
      "title": "Blog Title",
      "slug": "blog-title",
      "excerpt": "...",
      "image_url": "...",
      "category": "skincare",
      "author": "Author Name",
      "published_at": "2024-01-01T00:00:00",
      "views": 1250
    }
  ],
  "page": 1,
  "limit": 10
}
```

### Get Blog by Slug
```
GET /blog/{slug}

Response: { /* blog object with full content */ }
```

### Get Blog Categories
```
GET /blog/categories

Response: ["skincare", "education", "trends"]
```

## Contact Endpoints

### Submit Contact Form
```
POST /contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Support Request",
  "message": "I have a question..."
}

Response:
{
  "message": "Message sent successfully",
  "id": "contact-123"
}
```

## Payment Endpoints

### Create Order
```
POST /payments/create-order
Content-Type: application/json

{
  "plan_id": "pro"
}

Response:
{
  "order_id": "order_123",
  "amount": 9999,
  "currency": "INR"
}
```

### Verify Payment
```
POST /payments/verify
Content-Type: application/json

{
  "order_id": "order_123",
  "payment_id": "pay_123",
  "signature": "signature_123"
}

Response:
{
  "message": "Payment verified successfully",
  "subscription_id": "sub_123"
}
```

### Get Subscription
```
GET /payments/subscription

Response:
{
  "plan": "pro",
  "status": "active",
  "expires_at": "2025-12-31T23:59:59"
}
```

## Admin Endpoints

### Get Analytics
```
GET /admin/analytics

Response:
{
  "total_users": 1250,
  "total_products": 5000,
  "active_users": 875,
  "revenue": 50000
}
```

### Get Users
```
GET /admin/users?page=1&limit=10

Response:
{
  "items": [ /* user objects */ ],
  "page": 1
}
```

### Get Products
```
GET /admin/products?page=1&limit=10

Response:
{
  "items": [ /* product objects */ ]
}
```

### Get FAQs
```
GET /admin/faq

Response:
{
  "items": [
    {
      "id": "faq-123",
      "question": "Question?",
      "answer": "Answer..."
    }
  ]
}
```

## Error Handling

All errors follow this format:
```json
{
  "detail": "Error message"
}
```

Status codes:
- 200: OK
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Authentication

Include JWT token in Authorization header:
```
Authorization: Bearer {access_token}
```

## Rate Limiting

- Free plan: 100 requests/hour
- Pro plan: 1000 requests/hour
- Premium plan: Unlimited
