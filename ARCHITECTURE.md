# AI Policy Writer - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                             │
│                    (React Frontend)                         │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP/REST
                     │
┌────────────────────▼────────────────────────────────────────┐
│                    FastAPI Backend                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  API Routes                                          │  │
│  │  - POST /api/organizations                           │  │
│  │  - POST /api/questionnaire/submit                    │  │
│  │  - POST /api/policies/generate                       │  │
│  │  - GET  /download/policies/:filename                 │  │
│  └───────────────────┬──────────────────────────────────┘  │
│                      │                                      │
│  ┌───────────────────▼──────────────────────────────────┐  │
│  │  Business Logic                                      │  │
│  │  - Validation                                        │  │
│  │  - Conditional Logic Engine                         │  │
│  │  - Policy Generator                                  │  │
│  └───────────────────┬──────────────────────────────────┘  │
│                      │                                      │
│  ┌───────────────────▼──────────────────────────────────┐  │
│  │  Data Layer                                          │  │
│  │  - SQLite Database                                   │  │
│  │  - File System (generated .docx)                    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Component Breakdown

### Frontend (React + Vite)

#### Pages
- **Landing.jsx**: Marketing page with CTA
- **Questionnaire.jsx**: Multi-step form with 23 questions
- **Generate.jsx**: Policy generation status and download

#### Components
- **ProgressBar.jsx**: Visual progress indicator for form sections
- **App.jsx**: Router configuration

#### State Management
- Local component state using React hooks
- No global state management needed for MVP
- Form data stored in component state

#### Routing
```
/ → Landing page
/questionnaire → Multi-step form
/generate?org_id=X&questionnaire_id=Y → Generation page
```

### Backend (FastAPI + Python)

#### API Routes (`main.py`)

**Organization Management:**
```python
POST /api/organizations
- Creates organization record
- Returns org_id for subsequent calls
```

**Questionnaire Submission:**
```python
POST /api/questionnaire/submit
- Validates responses (BYOD/MDM conflict check)
- Stores JSON responses in database
- Returns questionnaire_id
```

**Policy Generation:**
```python
POST /api/policies/generate
- Fetches org data and responses
- Applies conditional logic
- Generates Word document
- Returns download URL
```

**File Download:**
```python
GET /download/policies/:filename
- Serves generated .docx files
- Proper content-type headers
```

#### Policy Generator (`policy_generator.py`)

**Class: PolicyGenerator**

Key methods:
- `_add_title()`: Company name + metadata
- `_add_purpose()`: Static purpose section
- `_add_applicability()`: Who policy applies to
- `_add_user_responsibilities()`: Conditional based on MFA/password manager
- `_add_prohibited_use()`: Static prohibited activities
- `_add_expectations_of_privacy()`: Based on monitoring policy
- `_add_personal_use()`: Conditional based on personal use level
- `_add_remote_work()`: Conditional based on remote work policy
- `_add_byod()`: Conditional based on BYOD policy
- `_add_revision_history()`: Table with version info

**Conditional Logic Examples:**

```python
# BYOD Logic
if byod_policy == 'Not allowed':
    # Add prohibition statements
elif byod_policy == 'Allowed with MDM':
    if has_mdm:
        # Add MDM enrollment requirements
    else:
        # Show error
elif byod_policy == 'Guest network only':
    # Add guest network restrictions

# Remote Work Logic
if remote_policy in ['Fully remote', 'Hybrid']:
    # Add remote security requirements
elif remote_policy == 'Office only':
    # Skip section
```

#### Database Schema (`database.py`)

**Organizations Table:**
```sql
id (PK), company_name, industry, size, 
employee_count, has_mfa, has_password_manager, 
has_mdm, created_at
```

**Questionnaire Responses Table:**
```sql
id (PK), org_id (FK), responses (JSON), 
completed_at
```

**Policies Table:**
```sql
id (PK), org_id (FK), policy_type, 
document_path, generated_at
```

## Data Flow

### Policy Generation Flow

```
1. User fills questionnaire
   └→ Frontend validates each section
   
2. User clicks "Generate Policy"
   └→ POST /api/organizations
       ├→ Insert into organizations table
       └→ Return org_id
       
3. Frontend submits responses
   └→ POST /api/questionnaire/submit
       ├→ Validate BYOD/MDM conflict
       ├→ Insert into questionnaire_responses
       └→ Return questionnaire_id
       
4. Frontend navigates to /generate
   └→ POST /api/policies/generate
       ├→ Fetch org_id data
       ├→ Fetch questionnaire responses
       ├→ PolicyGenerator.generate()
       │   ├→ Apply conditional rules
       │   ├→ Build document sections
       │   └→ Save .docx file
       ├→ Insert into policies table
       └→ Return download URL
       
5. User clicks download
   └→ GET /download/policies/:filename
       └→ Stream .docx file
```

## Key Design Decisions

### Why SQLite?
- Lightweight for MVP
- No separate database server needed
- Easy to deploy
- Can migrate to PostgreSQL for production

### Why python-docx?
- Native Python library
- Full control over document structure
- No external dependencies
- Supports complex formatting

### Why No Global State?
- Simple enough for local state
- Reduces complexity
- Easier to maintain
- Can add Redux/Context if needed later

### Why Multi-Step Form?
- Better UX (less overwhelming)
- Section-based validation
- Clear progress indication
- Mobile-friendly

### Why Conditional Validation?
- Prevents invalid policy combinations
- Better user experience
- Catches conflicts early
- Reduces support requests

## Security Considerations

### Current Implementation (MVP)
- Basic input validation
- SQL injection protection (parameterized queries)
- CORS configuration
- File path validation

### Production Enhancements Needed
- [ ] User authentication (JWT)
- [ ] Rate limiting
- [ ] Input sanitization
- [ ] HTTPS only
- [ ] Environment-based config
- [ ] Audit logging
- [ ] File access controls
- [ ] Database encryption

## Performance Considerations

### Current Performance
- Document generation: 1-2 seconds
- Database queries: <50ms
- Total flow: 10-15 seconds (includes UI delays)

### Optimization Opportunities
- [ ] Caching for static content
- [ ] Async document generation
- [ ] Background job queue
- [ ] CDN for frontend
- [ ] Database indexing
- [ ] Connection pooling

## Scalability Path

### Current Limits (MVP)
- Single server deployment
- File system storage
- Synchronous processing
- No caching

### Scaling Strategy
1. **Phase 1**: Add database connection pooling
2. **Phase 2**: Move to cloud storage (S3)
3. **Phase 3**: Add Redis caching
4. **Phase 4**: Background job processing (Celery)
5. **Phase 5**: Horizontal scaling with load balancer
6. **Phase 6**: Microservices architecture

## Technology Choices

### Backend: FastAPI
**Pros:**
- Fast performance
- Automatic API documentation
- Built-in validation (Pydantic)
- Modern async support
- Type hints

**Alternatives considered:**
- Flask (simpler but less features)
- Django (too heavy for MVP)
- Express (would require Node.js)

### Frontend: React + Vite
**Pros:**
- Fast build times
- Modern development experience
- Hot module replacement
- Large ecosystem
- Easy deployment

**Alternatives considered:**
- Next.js (overkill for MVP)
- Vue.js (less ecosystem)
- Plain JavaScript (harder to maintain)

### Document Generation: python-docx
**Pros:**
- Pure Python
- Rich formatting support
- No external dependencies
- Good documentation

**Alternatives considered:**
- docxtemplater (requires Node.js)
- jinja2docx (less flexible)
- HTML to DOCX (formatting issues)

## File Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py           # API routes + app config
│   ├── database.py       # DB setup + operations
│   ├── models.py         # Pydantic models
│   └── policy_generator.py # Document generation logic
└── requirements.txt

frontend/
├── src/
│   ├── components/       # Reusable components
│   ├── pages/           # Page components
│   ├── App.jsx          # Router
│   ├── main.jsx         # Entry point
│   └── index.css        # Tailwind styles
├── index.html
├── package.json
└── vite.config.js       # Vite + proxy config
```

## Testing Strategy

### Current Testing (Manual)
- End-to-end user flow
- Edge cases (BYOD/MDM conflict)
- Document format verification

### Testing Roadmap
1. **Unit Tests**: Policy generator logic
2. **Integration Tests**: API endpoints
3. **E2E Tests**: Full user flows (Playwright)
4. **Load Tests**: Concurrent policy generations
5. **Security Tests**: Input validation, XSS, CSRF

## Deployment Architecture

### Development
```
localhost:8000 ← Backend (FastAPI)
localhost:5173 ← Frontend (Vite dev server)
```

### Production (Suggested)
```
Frontend: Vercel/Netlify (CDN + SPA hosting)
Backend: Railway/Render (Container deployment)
Database: PostgreSQL (managed service)
Storage: S3 (generated documents)
```

## Future Enhancements

### Short-term
- [ ] Additional policy types
- [ ] Email delivery
- [ ] PDF export option

### Medium-term
- [ ] User accounts
- [ ] Policy versioning
- [ ] Template customization UI
- [ ] Batch generation

### Long-term
- [ ] Multi-language support
- [ ] AI-powered recommendations
- [ ] Integration APIs
- [ ] White-label solution

