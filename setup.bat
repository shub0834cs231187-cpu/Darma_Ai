@echo off

echo 🚀 DermaAI Setup Script
echo =======================

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    exit /b 1
)

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python first.
    exit /b 1
)

echo ✓ Node.js and Python are installed

REM Setup frontend
echo.
echo 📦 Setting up Frontend...
cd frontend
call npm install
cd ..
echo ✓ Frontend dependencies installed

REM Setup backend
echo.
echo 📦 Setting up Backend...
cd backend
pip install -r requirements.txt
cd ..
echo ✓ Backend dependencies installed

REM Create .env files
echo.
echo 📝 Creating environment files...

if not exist "frontend\.env" (
    copy frontend\.env.example frontend\.env
    echo ✓ Frontend .env created ^(update with your values^)
)

if not exist "backend\.env" (
    copy backend\.env.example backend\.env
    echo ✓ Backend .env created ^(update with your values^)
)

echo.
echo ✅ Setup complete!
echo.
echo Next steps:
echo 1. Update .env files with your configuration
echo 2. Run: npm run dev
echo.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:8000
echo API Docs: http://localhost:8000/docs
