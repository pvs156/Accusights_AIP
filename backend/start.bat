@echo off
REM Start script for the backend server (Windows)

echo Starting AI Policy Writer Backend...

REM Check if venv exists
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate venv
call venv\Scripts\activate

REM Install dependencies
echo Installing dependencies...
pip install -r requirements.txt

REM Check if database exists
if not exist "..\policy_writer.db" (
    echo Initializing database...
    cd ..
    python init_db.py
    cd backend
)

REM Start server
echo Starting server on http://localhost:8000
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

