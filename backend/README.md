# DermaAI Backend (Express + MongoDB)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
cp .env.example .env
```

3. Seed data (optional but recommended):
```bash
npm run seed
```

4. Start server:
```bash
npm run dev
```

Backend runs at `http://localhost:5000`.

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

MongoDB is required. Update `MONGO_URI` in `.env`.
