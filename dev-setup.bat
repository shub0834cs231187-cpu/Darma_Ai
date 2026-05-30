@echo off
REM DermaAI Development Setup
REM This script sets up the entire development environment

echo 🚀 DermaAI Development Environment Setup
echo ========================================

REM Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js not found. Please install Node.js 18+
    exit /b 1
)

REM Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python 3 not found. Please install Python 3.11+
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('python --version') do set PYTHON_VERSION=%%i

echo ✓ Node.js %NODE_VERSION%
echo ✓ Python %PYTHON_VERSION%

REM Setup frontend
echo.
echo 📦 Installing Frontend Dependencies
cd frontend
call npm install
cd ..
echo ✓ Frontend dependencies installed

REM Setup backend
echo.
echo 📦 Installing Backend Dependencies
cd backend
pip install -r requirements.txt
cd ..
echo ✓ Backend dependencies installed

REM Setup environment files
echo.
echo 📝 Creating Environment Files

if not exist "frontend\.env" (
    copy frontend\.env.example frontend\.env
    echo ✓ Created frontend\.env
) else (
    echo ⚠ frontend\.env already exists
)

if not exist "backend\.env" (
    copy backend\.env.example backend\.env
    echo ✓ Created backend\.env
) else (
    echo ⚠ backend\.env already exists
)

REM Create directories if needed
if not exist "database\migrations" mkdir database\migrations
if not exist "backend\logs" mkdir backend\logs

echo.
echo ✅ Setup complete!
echo.
echo 📋 Next steps:
echo    1. Update .env files with your configuration
echo    2. Configure database in backend\.env
echo    3. Run: npm run dev
echo.
echo 🌐 URLs:
echo    Frontend:  http://localhost:5173
echo    Backend:   http://localhost:8000
echo    API Docs:  http://localhost:8000/docs
echo.
echo 💡 Tips:
echo    - To start frontend only: cd frontend ^&^& npm run dev
echo    - To start backend only: cd backend ^&^& uvicorn main:app --reload
echo.
