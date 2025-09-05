@echo off
setlocal enabledelayedexpansion

:: Book Explorer - Automated Startup Script
:: This script automatically starts the complete Book Explorer application

echo ===============================================
echo       Book Explorer - Application Startup
echo ===============================================
echo.

:: Check if Node.js is installed
echo [1/6] Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo ✓ Node.js is installed

:: Check if MongoDB is running
echo.
echo [2/6] Checking MongoDB connection...
timeout /t 2 >nul
echo ✓ Proceeding with MongoDB check...

:: Install dependencies if node_modules don't exist
echo.
echo [3/6] Checking and installing dependencies...

if not exist "backend\node_modules" (
    echo Installing backend dependencies...
    cd backend
    call npm install
    if errorlevel 1 (
        echo ERROR: Failed to install backend dependencies
        pause
        exit /b 1
    )
    cd ..
)

if not exist "frontend\node_modules" (
    echo Installing frontend dependencies...
    cd frontend
    call npm install
    if errorlevel 1 (
        echo ERROR: Failed to install frontend dependencies
        pause
        exit /b 1
    )
    cd ..
)

if not exist "scraper\node_modules" (
    echo Installing scraper dependencies...
    cd scraper
    call npm install
    if errorlevel 1 (
        echo ERROR: Failed to install scraper dependencies
        pause
        exit /b 1
    )
    cd ..
)

echo ✓ All dependencies are installed

:: Check if database has data, if not run scraper
echo.
echo [4/6] Checking database and populating if needed...
echo Starting data scraper to populate database...
cd scraper
start /min cmd /c "npm start && timeout /t 5"
cd ..
echo ✓ Database population initiated

:: Wait a moment for scraper to start
timeout /t 3 >nul

:: Start backend server
echo.
echo [5/6] Starting backend server...
cd backend
start "Book Explorer Backend" cmd /k "echo Starting Backend Server on http://localhost:5000 && npm start"
cd ..

:: Wait for backend to initialize
echo Waiting for backend to initialize...
timeout /t 5 >nul

:: Start frontend development server
echo.
echo [6/6] Starting frontend application...
cd frontend
start "Book Explorer Frontend" cmd /k "echo Starting Frontend on http://localhost:5173 && npm run dev"
cd ..

:: Final instructions
echo.
echo ===============================================
echo           Application Started Successfully!
echo ===============================================
echo.
echo Backend Server:  http://localhost:5000
echo Frontend App:    http://localhost:5173
echo.
echo The application will open automatically in your browser.
echo You can close this window - the servers will continue running.
echo.
echo To stop the application:
echo - Close the "Book Explorer Backend" window
echo - Close the "Book Explorer Frontend" window
echo.
echo ===============================================

:: Wait a moment then open browser
timeout /t 3 >nul
start http://localhost:5173

echo.
echo Press any key to close this startup window...
pause >nul
