#!/bin/bash
# Start script for the frontend server

echo "Starting AI Policy Writer Frontend..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start dev server
echo "Starting server on http://localhost:5173"
npm run dev

