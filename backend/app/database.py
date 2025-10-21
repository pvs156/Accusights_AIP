import sqlite3
import os
from datetime import datetime
import json

DATABASE_PATH = os.getenv("DATABASE_URL", "sqlite:///./policy_writer.db").replace("sqlite:///", "")

def get_db():
    """Get database connection"""
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initialize database with schema"""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    # Create organizations table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS organizations (
            id TEXT PRIMARY KEY,
            company_name TEXT NOT NULL,
            industry TEXT NOT NULL,
            size TEXT NOT NULL,
            employee_count INTEGER,
            has_mfa BOOLEAN,
            has_password_manager BOOLEAN,
            has_mdm BOOLEAN,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    # Create questionnaire_responses table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS questionnaire_responses (
            id TEXT PRIMARY KEY,
            org_id TEXT REFERENCES organizations(id),
            responses TEXT,
            completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    # Create policies table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS policies (
            id TEXT PRIMARY KEY,
            org_id TEXT REFERENCES organizations(id),
            policy_type TEXT DEFAULT 'acceptable_use',
            document_path TEXT,
            generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    conn.commit()
    conn.close()
    print("Database initialized successfully!")

if __name__ == "__main__":
    init_db()

