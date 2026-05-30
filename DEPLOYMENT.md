# DermaAI Deployment Guide

## Frontend Deployment

### Option 1: Vercel (Recommended for React)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Set environment variables:
   ```
   VITE_API_URL=https://your-backend-url.com
   VITE_GOOGLE_CLIENT_ID=your-google-client-id
   VITE_RAZORPAY_KEY_ID=your-razorpay-key-id
   ```
5. Click Deploy

### Option 2: Netlify

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Build: `cd frontend && npm run build`
3. Deploy: `netlify deploy --prod --dir=dist`

### Option 3: Docker

```bash
cd frontend
docker build -t dermaai-frontend .
docker run -p 80:5173 dermaai-frontend
```

## Backend Deployment

### Option 1: Railway.app (Recommended)

1. Push code to GitHub
2. Go to [railway.app](https://railway.app)
3. Create new project
4. Connect GitHub repository
5. Add PostgreSQL plugin
6. Set environment variables
7. Deploy

### Option 2: Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create dermaai-api`
4. Add PostgreSQL: `heroku addons:create heroku-postgresql:hobby-dev`
5. Set environment variables: `heroku config:set KEY=VALUE`
6. Deploy: `git push heroku main`

### Option 3: AWS EC2

1. Launch EC2 instance (Ubuntu)
2. SSH into instance
3. Install dependencies:
   ```bash
   sudo apt update
   sudo apt install python3-pip postgresql postgresql-contrib
   ```
4. Clone repository
5. Install Python dependencies
6. Configure PostgreSQL
7. Run with Gunicorn:
   ```bash
   gunicorn -w 4 -b 0.0.0.0:8000 main:app
   ```

### Option 4: Docker

```bash
cd backend
docker build -t dermaai-backend .
docker run -p 8000:8000 -e DATABASE_URL=postgresql://... dermaai-backend
```

## Docker Compose (Full Stack)

```bash
docker-compose up
```

This will start:
- PostgreSQL (port 5432)
- Backend (port 8000)
- Frontend (port 5173)

## Database Setup

### Local PostgreSQL

```bash
# Create database
createdb dermaai_db

# Create user
createuser dermaai_user

# Set password
psql -c "ALTER USER dermaai_user WITH PASSWORD 'password';"

# Grant privileges
psql -c "GRANT ALL PRIVILEGES ON DATABASE dermaai_db TO dermaai_user;"

# Initialize tables
python init_db.py
```

### Cloud PostgreSQL

- **AWS RDS**: Create PostgreSQL instance
- **Neon.tech**: Serverless PostgreSQL (free tier available)
- **DigitalOcean**: Managed PostgreSQL
- **Railway.app**: Includes PostgreSQL plugin

## Environment Variables Checklist

### Frontend
- [ ] VITE_API_URL
- [ ] VITE_GOOGLE_CLIENT_ID
- [ ] VITE_RAZORPAY_KEY_ID

### Backend
- [ ] DATABASE_URL
- [ ] SECRET_KEY
- [ ] CLOUDINARY_CLOUD_NAME
- [ ] CLOUDINARY_API_KEY
- [ ] CLOUDINARY_API_SECRET
- [ ] RAZORPAY_KEY_ID
- [ ] RAZORPAY_KEY_SECRET
- [ ] SMTP_SERVER
- [ ] SMTP_USERNAME
- [ ] SMTP_PASSWORD

## Production Checklist

- [ ] Environment variables set
- [ ] Database configured and seeded
- [ ] CORS configured correctly
- [ ] HTTPS enabled
- [ ] Error logging configured
- [ ] Database backups configured
- [ ] CDN configured for static files
- [ ] Rate limiting enabled
- [ ] Security headers configured
- [ ] API versioning implemented

## Monitoring

### Frontend
- Sentry for error tracking
- Vercel Analytics for performance

### Backend
- Application logging
- Sentry for error tracking
- Database monitoring
- API performance metrics

## Continuous Integration/Deployment

GitHub Actions workflows are configured in `.github/workflows/`:
- `ci.yml` - Runs tests on push
- `deploy.yml` - Deploys to production on main branch

Push to `main` to trigger automatic deployment.

## Support

For deployment issues, check:
1. Environment variables are set correctly
2. Database is accessible
3. All dependencies are installed
4. Ports are not blocked by firewall
5. SSL certificates are valid

## Cost Estimate (Monthly)

| Service | Cost |
|---------|------|
| Frontend Hosting (Vercel) | Free |
| Backend (Railway) | ~$5 |
| Database (Railway) | ~$10 |
| CloudinaryStorage | Free (50GB) |
| Email Service | ~$10 |
| **Total** | ~$25 |
