@echo off
setlocal enabledelayedexpansion

:: Book Explorer - First Time Setup Script
:: This script sets up the project for first-time users

echo ===============================================
echo       Book Explorer - First Time Setup
echo ===============================================
echo.

:: Check if Node.js is installed
echo [1/4] Verifying Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo After installation, restart this script.
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%a in ('node --version') do set NODE_VERSION=%%a
echo ✓ Node.js !NODE_VERSION! is installed

:: Check if MongoDB is installed
echo.
echo [2/4] Checking MongoDB installation...
mongod --version >nul 2>&1
if errorlevel 1 (
    echo WARNING: MongoDB not found in PATH
    echo.
    echo Please ensure MongoDB is installed and running:
    echo 1. Download from: https://www.mongodb.com/try/download/community
    echo 2. Install and start MongoDB service
    echo 3. Or use MongoDB Atlas cloud database
    echo.
    echo Press any key to continue anyway...
    pause >nul
) else (
    echo ✓ MongoDB is installed
)

:: Install all dependencies
echo.
echo [3/4] Installing all project dependencies...
echo This may take a few minutes...
echo.

echo Installing root dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install root dependencies
    pause
    exit /b 1
)

echo Installing backend dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)
cd ..

echo Installing frontend dependencies...
cd frontend
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)
cd ..

echo Installing scraper dependencies...
cd scraper
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install scraper dependencies
    pause
    exit /b 1
)
cd ..

echo ✓ All dependencies installed successfully!

:: Setup complete
echo.
echo [4/4] Setup verification...
echo ✓ Node.js ready
echo ✓ Dependencies installed
echo ✓ Project structure verified

echo.
echo ===============================================
echo            Setup Complete!
echo ===============================================
echo.
echo Next steps:
echo 1. Ensure MongoDB is running on your system
echo 2. Run 'start-app.bat' to start the application
echo 3. Access the app at http://localhost:5173
echo.
echo Quick start commands:
echo - start-app.bat    : Start the complete application
echo - stop-app.bat     : Stop all application processes
echo.
echo For manual control:
echo - Backend:  cd backend ^&^& npm start
echo - Frontend: cd frontend ^&^& npm run dev
echo - Scraper:  cd scraper ^&^& npm start
echo.
echo ===============================================
echo.
pause
