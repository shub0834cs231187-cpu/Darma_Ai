# DermaAI Backend
AI-powered skin analysis and recommendation system

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your credentials
```

3. Initialize database:
```bash
python init_db.py
```

4. Run the server:
```bash
uvicorn main:app --reload
```

The API will be available at http://localhost:8000
API documentation at http://localhost:8000/docs

## API Endpoints

- `/auth/` - Authentication
- `/users/` - User management
- `/analysis/` - Skin analysis
- `/products/` - Product database
- `/recommendations/` - Personalized recommendations
- `/blog/` - Blog posts
- `/contact/` - Contact form
- `/payments/` - Subscription payments
- `/admin/` - Admin dashboard

## Database

PostgreSQL is required. Update DATABASE_URL in .env with your connection string.
