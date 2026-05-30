# DermaAI - Full-Stack Website

AI-powered dermatology and skincare intelligence system with skin analysis, product recommendations, and personalized routines.

## Quick Start

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

### Backend

```bash
cd backend
pip install -r requirements.txt
python init_db.py
uvicorn main:app --reload
```

Backend runs on `http://localhost:8000`

## Tech Stack

**Frontend:**
- React.js with Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- React Router
- Axios
- Recharts
- Zustand (State Management)

**Backend:**
- FastAPI
- Python
- SQLAlchemy ORM
- PostgreSQL
- JWT Authentication
- Cloudinary (Image Storage)
- Razorpay (Payments)

## Features

✅ Landing Page with modern design
✅ User Authentication (Login/Register)
✅ AI Skin Analysis
✅ Product Analyzer & Ingredient Checker
✅ Personalized Skincare Routines
✅ User Dashboard
✅ Blog System
✅ Pricing Plans with Razorpay Integration
✅ Admin Dashboard
✅ Dark Mode Support
✅ Responsive Design
✅ RESTful API

## Project Structure

```
TMM/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── types/
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── utils/
│   ├── main.py
│   ├── requirements.txt
│   └── init_db.py
└── database/
```

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_RAZORPAY_KEY_ID=your-razorpay-key-id
```

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost/dermaai_db
SECRET_KEY=your-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
```

## API Documentation

View API docs at `http://localhost:8000/docs`

## Features in Detail

### Landing Page
- Announcement bar
- Sticky navbar
- Hero section with animations
- Features showcase
- Statistics section
- Testimonials
- Pricing plans
- FAQ section
- Newsletter signup
- Contact form
- Footer

### User Authentication
- Sign up with email
- Login with email/password
- Google OAuth login
- Email verification
- Forgot password functionality

### Skin Analysis
- Upload skin image
- AI-powered analysis
- Skin scores (overall, hydration, acne, risk)
- Condition detection
- Recommendations based on analysis

### Product Analyzer
- Search products
- Analyze ingredients
- Safe vs risk ingredients
- Comedogenic score
- Acne trigger detection

### Personalized Recommendations
- Morning skincare routine
- Night skincare routine
- Weekly treatments
- Based on skin type

### Admin Dashboard
- User management
- Product management
- FAQ management
- Analytics
- Content management

## Deployment

### Frontend
```bash
npm run build
# Deploy dist/ folder to Vercel, Netlify, or any static hosting
```

### Backend
```bash
# Deploy to Heroku, Railway, or any cloud platform that supports Python
gunicorn main:app
```

## Security Features

✅ JWT Authentication
✅ Password Hashing (bcrypt)
✅ CORS Protection
✅ Input Validation
✅ Secure Environment Variables
✅ OAuth 2.0 Integration

## Performance

✅ Image Optimization with Cloudinary
✅ Lazy Loading
✅ Code Splitting
✅ Database Indexing
✅ Caching Strategies

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Submit pull request

## License

MIT License - feel free to use for personal and commercial projects.

## Support

For issues and questions, please create an issue on GitHub.

## Credits

Built with ❤️ for healthy skin.
