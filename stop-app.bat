@echo off
setlocal enabledelayedexpansion

:: Book Explorer - Application Stop Script
:: This script stops all running Book Explorer processes

echo ===============================================
echo        Book Explorer - Stopping Application
echo ===============================================
echo.

echo [1/3] Stopping Node.js processes...

:: Kill processes running on ports 5000 and 5173
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5000') do (
    echo Stopping backend server (PID: %%a)
    taskkill /PID %%a /F >nul 2>&1
)

for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5173') do (
    echo Stopping frontend server (PID: %%a)
    taskkill /PID %%a /F >nul 2>&1
)

echo.
echo [2/3] Cleaning up processes...

:: Stop any remaining Node.js processes with our project names
taskkill /F /FI "WINDOWTITLE eq Book Explorer Backend" >nul 2>&1
taskkill /F /FI "WINDOWTITLE eq Book Explorer Frontend" >nul 2>&1

echo.
echo [3/3] Application stopped successfully!
echo.
echo ===============================================
echo         All Book Explorer processes stopped
echo ===============================================
echo.
echo You can now safely:
echo - Restart the application using start-app.bat
echo - Make code changes
echo - Close your development environment
echo.
pause
