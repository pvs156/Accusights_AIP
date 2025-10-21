@echo off
echo ========================================
echo   AccuSights - Share with Team (Ngrok)
echo ========================================
echo.

REM Check if ngrok is installed
where ngrok >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Ngrok not found!
    echo Please install: npm install -g ngrok
    echo Or download from: https://ngrok.com/download
    pause
    exit /b
)

echo Starting AccuSights servers...
echo.

REM Start Backend
echo [1/4] Starting backend server...
start "AccuSights Backend" cmd /k "cd backend && venv\Scripts\activate && python init_db.py && uvicorn app.main:app --host 0.0.0.0 --port 8000"
timeout /t 5 /nobreak >nul

REM Expose Backend
echo [2/4] Exposing backend to internet...
start "Backend URL (ngrok)" cmd /k "ngrok http 8000"
timeout /t 3 /nobreak >nul

REM Start Frontend
echo [3/4] Starting frontend server...
start "AccuSights Frontend" cmd /k "cd frontend && npm run dev -- --host 0.0.0.0"
timeout /t 8 /nobreak >nul

REM Expose Frontend
echo [4/4] Exposing frontend to internet...
start "Frontend URL (ngrok)" cmd /k "ngrok http 5173"
timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo   AccuSights is starting!
echo ========================================
echo.
echo IMPORTANT STEPS:
echo.
echo 1. Wait for all windows to finish loading (30-60 seconds)
echo.
echo 2. Look at the "Frontend URL (ngrok)" window
echo    - Find the line with "Forwarding"
echo    - Copy the HTTPS URL (e.g., https://xxxx.ngrok.io)
echo.
echo 3. Share that URL with your team!
echo.
echo 4. Your team can access AccuSights from anywhere
echo.
echo 5. Keep all windows open while team is using it
echo.
echo 6. Close windows when done
echo.
echo ========================================
echo.
echo TIP: First time? It may take 1-2 minutes to fully start
echo.
pause

