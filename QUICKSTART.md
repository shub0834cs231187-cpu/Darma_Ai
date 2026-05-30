# Quick Reference Guide

## 🚀 Getting Started (5 minutes)

### Option 1: Automated Setup
```bash
cd TMM
./dev-setup.sh  # macOS/Linux
# OR
dev-setup.bat   # Windows
```

### Option 2: Manual Setup
```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend (in another terminal)
cd backend
pip install -r requirements.txt
python init_db.py
uvicorn main:app --reload
```

## 📱 Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:5173 | Web application |
| Backend | http://localhost:8000 | API server |
| API Docs | http://localhost:8000/docs | Interactive API documentation |
| ReDoc | http://localhost:8000/redoc | Alternative API documentation |

## 🔑 Default Test Account

```
Email: user@example.com
Password: password123
```

## 📁 Key Files

### Frontend
- `src/App.tsx` - Main app component
- `src/pages/` - Page components
- `src/components/` - Reusable components
- `src/services/api.ts` - API calls
- `tailwind.config.js` - Styling configuration

### Backend
- `main.py` - Entry point
- `app/routes/` - API endpoints
- `app/models/` - Database models
- `app/schemas/` - Data validation
- `init_db.py` - Database setup

## 🔧 Common Commands

### Frontend
```bash
cd frontend

npm run dev           # Start development server
npm run build         # Build for production
npm run lint          # Run linter
npm install           # Install dependencies
```

### Backend
```bash
cd backend

uvicorn main:app --reload              # Start dev server
python init_db.py                       # Initialize database
python -m pytest                        # Run tests (if implemented)
pip install -r requirements.txt         # Install dependencies
```

## 📚 File Structure

```
src/
├── components/        # React components
├── pages/            # Page components
├── services/         # API & state
├── hooks/            # Custom hooks
├── utils/            # Helper functions
├── types/            # TypeScript types
└── App.tsx          # Main component

app/
├── routes/          # API endpoints
├── models/          # Database models
├── schemas/         # Data validation
├── services/        # Business logic
└── utils/           # Utilities
```

## 🔐 Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000
```

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost/dermaai_db
SECRET_KEY=your-secret-key
```

## 🌐 API Examples

### Register User
```bash
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email":"user@example.com",
    "password":"password",
    "first_name":"John",
    "last_name":"Doe"
  }'
```

### Login
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"user@example.com",
    "password":"password"
  }'
```

### Get Dashboard Data
```bash
curl http://localhost:8000/analysis/history \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🎨 Theme Customization

Edit `tailwind.config.js` to change:
- Primary color: `#6C63FF`
- Secondary color: `#00B4D8`
- Fonts and spacing
- Dark mode settings

## 🐛 Debugging

### Frontend
- Use Chrome DevTools
- Check console for errors
- React DevTools browser extension
- Check network tab in DevTools

### Backend
- Check terminal output
- API docs at `/docs`
- Check `.env` variables
- Database connection

## 📦 Production Build

### Frontend
```bash
cd frontend
npm run build
# Outputs to dist/
```

### Backend
```bash
cd backend
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 main:app
```

## 🐳 Docker

### Build & Run
```bash
# Frontend only
docker build -t dermaai-frontend ./frontend
docker run -p 80:5173 dermaai-frontend

# Backend only
docker build -t dermaai-backend ./backend
docker run -p 8000:8000 dermaai-backend

# Full stack
docker-compose up
```

## 📊 Database

### Reset Database
```bash
cd backend
rm dermaai_db.sqlite3  # if using SQLite
python init_db.py      # reinitialize
```

### Access PostgreSQL
```bash
psql -U dermaai_user -d dermaai_db
```

## 🚨 Common Issues

| Issue | Solution |
|-------|----------|
| Port already in use | Change port in .env or kill process |
| Database not found | Run `python init_db.py` |
| API not responding | Check if backend is running |
| Styling issues | Clear cache: `npm run dev` |
| CORS errors | Check API URL in frontend .env |

## 📞 Getting Help

1. Check API docs at `/docs`
2. Review README.md
3. Check DEPLOYMENT.md
4. Check API.md
5. Review error messages in console

## 🎯 Next Steps

1. ✅ Get it running locally
2. ⬜ Customize branding
3. ⬜ Configure payment gateway
4. ⬜ Set up email service
5. ⬜ Deploy to production

---

**Need help?** Check the full documentation in README.md, API.md, or DEPLOYMENT.md
