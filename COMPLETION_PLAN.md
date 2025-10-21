# Accusights - Completion Plan

## What's Already Working ✅

Your application is running with:
- Accusights branding on landing page
- Policy selection page with 3 cards
- Original 23-question questionnaire
- AUP policy generation

## What Still Needs to Be Done

### Priority 1: Complete Questionnaire (CRITICAL)

The current questionnaire needs Q24-Q45 added. Here's what needs to happen:

**File: `frontend/src/pages/Questionnaire.jsx`**

Add to formData state:
```javascript
// Account Management (Q24-Q33)
q24_password_length_with_mfa: '8',
q25_password_length_without_mfa: '14',
q26_passwords_expire: '',
q26_password_expiry_days: '90',
q27_mfa_scope: '',
q28_separate_admin_accounts: '',
q29_account_review_frequency: '',
q30_dormant_account_days: '',
q31_extended_leave_policy: '',
q32_credential_revocation_timeline: '',
q33_maintain_account_inventory: '',

// Incident Response (Q34-Q45)
q34_incident_manager_name: '',
q35_incident_manager_email: '',
q36_incident_manager_phone: '',
q37_external_third_party: '',
q38_backup_incident_manager: '',
q39_incident_reporting_methods: [],
q40_incident_report_recipients: '',
q41_incident_reporting_timeframe: '',
q42_external_ir_support: '',
q42_ir_company_name: '',
q43_hipaa_notification: '',
q44_gdpr_notification: '',
q45_other_regulatory_notifications: []
```

### Priority 2: Backend Policy Generators

**File: `backend/app/account_management_generator.py`**
```python
from docx import Document
from docx.shared import Pt, Inches
from datetime import datetime

class AccountManagementPolicyGenerator:
    def __init__(self, org_data, responses):
        self.org_data = org_data
        self.responses = responses
        self.doc = Document()
        self._setup_document()
    
    def _setup_document(self):
        # Same as existing policy_generator.py
        pass
    
    def _add_title(self):
        title = self.doc.add_heading(
            f"{self.responses.get('q1_company_name', 'Company')} "
            f"Account and Credential Management Policy",
            level=1
        )
        # Add Accusights branding in footer
        pass
    
    def _add_password_requirements(self):
        # Use Q24, Q25, Q26 responses
        has_mfa = self.responses.get('q9_mfa') == 'Yes'
        
        if has_mfa:
            pw_len_mfa = self.responses.get('q24_password_length_with_mfa', '8')
            pw_len_no_mfa = self.responses.get('q25_password_length_without_mfa', '14')
            # Add statements for both
        else:
            pw_len = self.responses.get('q25_password_length_without_mfa', '14')
            # Add single statement
    
    def _add_mfa_requirements(self):
        mfa_scope = self.responses.get('q27_mfa_scope', 'All users')
        # Generate conditional statements based on scope
    
    def _add_account_lifecycle(self):
        # Q29, Q30, Q31, Q32, Q33
        pass
    
    def generate(self, output_path):
        self._add_title()
        self._add_password_requirements()
        self._add_mfa_requirements()
        self._add_account_lifecycle()
        self.doc.save(output_path)
        return output_path
```

**File: `backend/app/incident_response_generator.py`**
```python
class IncidentResponsePolicyGenerator:
    # Similar structure
    
    def _add_incident_team(self):
        # Q34, Q35, Q36, Q37, Q38
        manager_name = self.responses.get('q34_incident_manager_name')
        manager_email = self.responses.get('q35_incident_manager_email')
        # etc.
    
    def _add_reporting_procedures(self):
        # Q39, Q40, Q41
        pass
    
    def _add_regulatory_compliance(self):
        # Q43 (HIPAA), Q44 (GDPR), Q45 (other)
        if self.responses.get('q43_hipaa_notification') == 'Yes':
            # Add HIPAA section
        if self.responses.get('q44_gdpr_notification') == 'Yes':
            # Add GDPR section
    
    def generate(self, output_path):
        # Build document
        pass
```

### Priority 3: Update API

**File: `backend/app/main.py`**

Modify `/api/policies/generate` endpoint:

```python
@app.post("/api/policies/generate")
async def generate_policy(request: PolicyGenerate):
    try:
        conn = get_db()
        cursor = conn.cursor()
        
        # Fetch data (same as before)
        org_data = dict(org_row)
        responses = json.loads(questionnaire_row['responses'])
        
        # Get selected policies from responses
        selected_policies = responses.get('selected_policies', {})
        
        generated_files = []
        
        # Generate AUP if selected
        if selected_policies.get('aup', False):
            aup_filename, aup_path = generate_policy_document(
                org_data, responses, GENERATED_POLICIES_DIR
            )
            generated_files.append({
                'type': 'aup',
                'filename': aup_filename,
                'url': f"/download/policies/{aup_filename}"
            })
        
        # Generate Account Management if selected
        if selected_policies.get('account', False):
            from .account_management_generator import generate_account_policy
            acc_filename, acc_path = generate_account_policy(
                org_data, responses, GENERATED_POLICIES_DIR
            )
            generated_files.append({
                'type': 'account',
                'filename': acc_filename,
                'url': f"/download/policies/{acc_filename}"
            })
        
        # Generate Incident Response if selected
        if selected_policies.get('incident', False):
            from .incident_response_generator import generate_incident_policy
            ir_filename, ir_path = generate_incident_policy(
                org_data, responses, GENERATED_POLICIES_DIR
            )
            generated_files.append({
                'type': 'incident',
                'filename': ir_filename,
                'url': f"/download/policies/{ir_filename}"
            })
        
        # Save all to database
        # Return array of files
        return {
            "policy_id": policy_id,
            "files": generated_files,
            "count": len(generated_files)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

### Priority 4: Update Generate Page

**File: `frontend/src/pages/Generate.jsx`**

Handle multiple files:
```javascript
const [policyData, setPolicyData] = useState(null);

// After successful generation:
if (response.data.files && response.data.files.length > 0) {
    setPolicyData(response.data);
    setStatus('success');
}

// In success rendering:
{policyData.files.map(file => (
    <div key={file.type}>
        <p>{file.filename}</p>
        <button onClick={() => window.location.href = file.url}>
            Download {file.type.toUpperCase()}
        </button>
    </div>
))}
```

## Quick Win Strategy

If you want to see it working faster:

**Option A: Minimal Working Demo**
1. Keep only AUP for now
2. Just add branding to documents
3. Test complete flow

**Option B: Full Implementation**
1. Add all 45 questions (takes time but complete)
2. Create 2 new generators
3. Update API for multiple generation
4. Full 3-policy system

## Files to Edit

1. `frontend/src/pages/Questionnaire.jsx` - Add Q24-Q45
2. `backend/app/account_management_generator.py` - NEW FILE
3. `backend/app/incident_response_generator.py` - NEW FILE
4. `backend/app/main.py` - Update generate endpoint
5. `backend/app/policy_generator.py` - Add Accusights branding
6. `frontend/src/pages/Generate.jsx` - Handle multiple files

## Testing Steps

1. Select all 3 policies
2. Answer 45 questions
3. Click "Generate Policies"
4. Download 3 documents:
   - CompanyName_Acceptable_Use_Policy_Accusights_2025.docx
   - CompanyName_Account_Management_Policy_Accusights_2025.docx
   - CompanyName_Incident_Response_Policy_Accusights_2025.docx

## Estimated Time

- Complete questionnaire: 2-3 hours
- Account Management generator: 2-3 hours
- Incident Response generator: 2-3 hours
- API updates: 1 hour
- Testing: 1 hour

**Total: 8-13 hours for full implementation**

## Current Recommendation

Since the servers are running, you can:

1. **NOW:** Browse to http://localhost:5173 and see Accusights branding + policy selection
2. **NEXT:** I can continue implementing the remaining pieces
3. **OR:** You can take over and implement based on this plan

Would you like me to continue implementing the remaining pieces?

