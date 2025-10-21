from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from dotenv import load_dotenv
import os
import uuid
import json
from datetime import datetime

from .database import get_db, init_db
from .models import (
    OrganizationCreate, OrganizationResponse,
    QuestionnaireSubmit, QuestionnaireResponse,
    PolicyGenerate, PolicyResponse
)
from .policy_generator import generate_policy_document

# Load environment variables
load_dotenv()

# Initialize database
init_db()

app = FastAPI(title="AI Policy Writer API", version="1.0.0")

# CORS configuration
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Log CORS origins for debugging
print(f"CORS Origins configured: {CORS_ORIGINS}")

GENERATED_POLICIES_DIR = os.getenv("GENERATED_POLICIES_DIR", "./generated_policies")

@app.get("/")
async def root():
    """Health check endpoint"""
    return {"status": "ok", "message": "AI Policy Writer API is running"}

@app.post("/api/organizations", response_model=OrganizationResponse)
async def create_organization(org: OrganizationCreate):
    """Create a new organization"""
    try:
        org_id = str(uuid.uuid4())
        created_at = datetime.now().isoformat()
        
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute("""
            INSERT INTO organizations (
                id, company_name, industry, size, employee_count,
                has_mfa, has_password_manager, has_mdm, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            org_id, org.company_name, org.industry, org.size,
            org.employee_count, org.has_mfa, org.has_password_manager,
            org.has_mdm, created_at
        ))
        
        conn.commit()
        conn.close()
        
        return OrganizationResponse(org_id=org_id, created_at=created_at)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create organization: {str(e)}")

@app.post("/api/questionnaire/submit", response_model=QuestionnaireResponse)
async def submit_questionnaire(submission: QuestionnaireSubmit):
    """Submit questionnaire responses"""
    try:
        questionnaire_id = str(uuid.uuid4())
        completed_at = datetime.now().isoformat()
        
        # Validate BYOD/MDM conflict
        responses = submission.responses
        if responses.get('q23_byod') == 'Allowed with MDM' and responses.get('q13_mdm') == 'No':
            raise HTTPException(
                status_code=400,
                detail="Cannot allow BYOD with MDM enrollment when MDM solution is not available"
            )
        
        conn = get_db()
        cursor = conn.cursor()
        
        # Verify organization exists
        cursor.execute("SELECT id FROM organizations WHERE id = ?", (submission.org_id,))
        if not cursor.fetchone():
            conn.close()
            raise HTTPException(status_code=404, detail="Organization not found")
        
        # Insert questionnaire response
        cursor.execute("""
            INSERT INTO questionnaire_responses (
                id, org_id, responses, completed_at
            ) VALUES (?, ?, ?, ?)
        """, (
            questionnaire_id, submission.org_id,
            json.dumps(responses), completed_at
        ))
        
        conn.commit()
        conn.close()
        
        return QuestionnaireResponse(
            questionnaire_id=questionnaire_id,
            status="completed"
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to submit questionnaire: {str(e)}")

@app.post("/api/policies/generate", response_model=PolicyResponse)
async def generate_policy(request: PolicyGenerate):
    """Generate policy document"""
    try:
        conn = get_db()
        cursor = conn.cursor()
        
        # Fetch organization data
        cursor.execute("SELECT * FROM organizations WHERE id = ?", (request.org_id,))
        org_row = cursor.fetchone()
        if not org_row:
            conn.close()
            raise HTTPException(status_code=404, detail="Organization not found")
        
        org_data = dict(org_row)
        
        # Fetch questionnaire responses
        cursor.execute(
            "SELECT * FROM questionnaire_responses WHERE id = ?",
            (request.questionnaire_id,)
        )
        questionnaire_row = cursor.fetchone()
        if not questionnaire_row:
            conn.close()
            raise HTTPException(status_code=404, detail="Questionnaire not found")
        
        responses = json.loads(questionnaire_row['responses'])
        
        # Generate policy document
        filename, document_path = generate_policy_document(
            org_data, responses, GENERATED_POLICIES_DIR
        )
        
        # Save policy record to database
        policy_id = str(uuid.uuid4())
        generated_at = datetime.now().isoformat()
        
        cursor.execute("""
            INSERT INTO policies (
                id, org_id, policy_type, document_path, generated_at
            ) VALUES (?, ?, ?, ?, ?)
        """, (
            policy_id, request.org_id, 'acceptable_use',
            document_path, generated_at
        ))
        
        conn.commit()
        conn.close()
        
        document_url = f"/download/policies/{filename}"
        
        return PolicyResponse(
            policy_id=policy_id,
            document_url=document_url,
            filename=filename
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate policy: {str(e)}")

@app.get("/download/policies/{filename}")
async def download_policy(filename: str):
    """Download generated policy document"""
    try:
        file_path = os.path.join(GENERATED_POLICIES_DIR, filename)
        
        if not os.path.exists(file_path):
            raise HTTPException(status_code=404, detail="File not found")
        
        return FileResponse(
            file_path,
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            filename=filename
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to download file: {str(e)}")

@app.get("/api/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "database": "connected",
        "policies_dir": os.path.exists(GENERATED_POLICIES_DIR)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

