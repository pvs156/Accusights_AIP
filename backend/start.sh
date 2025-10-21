#!/bin/bash
# Start script for the backend server

echo "Starting AI Policy Writer Backend..."

# Check if venv exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python -m venv venv
fi

# Activate venv
source venv/bin/activate

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Check if database exists
if [ ! -f "../policy_writer.db" ]; then
    echo "Initializing database..."
    cd ..
    python init_db.py
    cd backend
fi

# Start server
echo "Starting server on http://localhost:8000"
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

