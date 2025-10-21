#!/usr/bin/env python3
"""
Database initialization script for AI Policy Writer
Run this script to create the database and tables.
"""

import sys
import os

# Add backend to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

from backend.app.database import init_db

if __name__ == "__main__":
    print("Initializing database...")
    init_db()
    print("Database initialization complete!")

