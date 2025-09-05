# Quick Start Scripts

This project includes automated batch scripts to make development easier on Windows systems.

## Available Scripts

### 🚀 `setup.bat` - First Time Setup
Run this first when you clone the project:
- Checks system requirements (Node.js, MongoDB)
- Installs all dependencies automatically
- Verifies project setup

```bash
# Double-click or run:
setup.bat
```

### ▶️ `start-app.bat` - Start Application
One-click startup for the complete application:
- Starts MongoDB data scraper
- Launches backend server (http://localhost:5000)
- Launches frontend app (http://localhost:5173)
- Opens browser automatically

```bash
# Double-click or run:
start-app.bat
```

### ⏹️ `stop-app.bat` - Stop Application
Cleanly stops all application processes:
- Stops backend server
- Stops frontend development server
- Kills processes on ports 5000 and 5173

```bash
# Double-click or run:
stop-app.bat
```

## Usage Instructions

### For New Users:
1. Clone this repository
2. Run `setup.bat` (one time only)
3. Ensure MongoDB is running
4. Run `start-app.bat` to start the application
5. Access the app at http://localhost:5173

### Daily Development:
- Start: Double-click `start-app.bat`
- Stop: Double-click `stop-app.bat`

### Manual Control (Alternative):
If you prefer manual control:

```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend  
cd frontend
npm run dev

# Terminal 3 - Populate Database (if needed)
cd scraper
npm start
```

## Requirements
- Windows operating system
- Node.js (v14 or higher)
- MongoDB (local installation or Atlas)

## Troubleshooting

**Script won't run:**
- Right-click → "Run as administrator"
- Check if Node.js is in system PATH

**MongoDB errors:**
- Ensure MongoDB service is running
- Check MongoDB connection string in backend/server.js

**Port conflicts:**
- Run `stop-app.bat` to clear any stuck processes
- Check if ports 5000 or 5173 are used by other applications

**Permission errors:**
- Run Command Prompt as administrator
- Check antivirus software isn't blocking the scripts
