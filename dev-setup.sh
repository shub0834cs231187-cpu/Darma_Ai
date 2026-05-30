#!/usr/bin/env bash

# DermaAI Development Setup
# This script sets up the entire development environment

set -e

echo "🚀 DermaAI Development Environment Setup"
echo "========================================"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found. Please install Node.js 18+${NC}"
    exit 1
fi

# Check Python
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python 3 not found. Please install Python 3.11+${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js $(node --version)${NC}"
echo -e "${GREEN}✓ Python $(python3 --version)${NC}"

# Setup frontend
echo ""
echo -e "${YELLOW}📦 Installing Frontend Dependencies${NC}"
cd frontend
npm install
cd ..
echo -e "${GREEN}✓ Frontend dependencies installed${NC}"

# Setup backend
echo ""
echo -e "${YELLOW}📦 Installing Backend Dependencies${NC}"
cd backend
pip3 install -r requirements.txt
cd ..
echo -e "${GREEN}✓ Backend dependencies installed${NC}"

# Setup environment files
echo ""
echo -e "${YELLOW}📝 Creating Environment Files${NC}"

if [ ! -f "frontend/.env" ]; then
    cp frontend/.env.example frontend/.env
    echo -e "${GREEN}✓ Created frontend/.env${NC}"
else
    echo -e "${YELLOW}⚠ frontend/.env already exists${NC}"
fi

if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    echo -e "${GREEN}✓ Created backend/.env${NC}"
else
    echo -e "${YELLOW}⚠ backend/.env already exists${NC}"
fi

# Create directories if needed
mkdir -p database/migrations
mkdir -p backend/logs

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "📋 Next steps:"
echo "   1. Update .env files with your configuration"
echo "   2. Configure database in backend/.env"
echo "   3. Run: npm run dev (to start both frontend and backend)"
echo ""
echo "🌐 URLs:"
echo "   Frontend:  http://localhost:5173"
echo "   Backend:   http://localhost:8000"
echo "   API Docs:  http://localhost:8000/docs"
echo ""
echo "💡 Tips:"
echo "   - frontend/npm run dev    # Start frontend only"
echo "   - backend/uvicorn main:app --reload  # Start backend only"
echo ""
