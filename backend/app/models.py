from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class OrganizationCreate(BaseModel):
    company_name: str
    industry: str
    size: str
    employee_count: int
    has_mfa: bool
    has_password_manager: bool
    has_mdm: bool

class OrganizationResponse(BaseModel):
    org_id: str
    created_at: str

class QuestionnaireSubmit(BaseModel):
    org_id: str
    responses: dict

class QuestionnaireResponse(BaseModel):
    questionnaire_id: str
    status: str

class PolicyGenerate(BaseModel):
    org_id: str
    questionnaire_id: str

class PolicyResponse(BaseModel):
    policy_id: str
    document_url: str
    filename: str

