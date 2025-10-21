@echo off
REM Start script for the frontend server (Windows)

echo Starting AI Policy Writer Frontend...

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
)

REM Start dev server
echo Starting server on http://localhost:5173
npm run dev

