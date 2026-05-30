#!/bin/bash

echo "🚀 DermaAI Setup Script"
echo "======================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3 first."
    exit 1
fi

echo "✓ Node.js and Python 3 are installed"

# Setup frontend
echo ""
echo "📦 Setting up Frontend..."
cd frontend
npm install
cd ..
echo "✓ Frontend dependencies installed"

# Setup backend
echo ""
echo "📦 Setting up Backend..."
cd backend
pip install -r requirements.txt
cd ..
echo "✓ Backend dependencies installed"

# Create .env files
echo ""
echo "📝 Creating environment files..."

if [ ! -f "frontend/.env" ]; then
    cp frontend/.env.example frontend/.env
    echo "✓ Frontend .env created (update with your values)"
fi

if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    echo "✓ Backend .env created (update with your values)"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env files with your configuration"
echo "2. Run: npm run dev"
echo ""
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:8000"
echo "API Docs: http://localhost:8000/docs"
