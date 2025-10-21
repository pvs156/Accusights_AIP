# AI Policy Writer MVP

A full-stack web application that generates customized cybersecurity policies. Answer 23 questions about your organization, and the system generates a professional, customized Acceptable Use Policy as a downloadable Word document (.docx).

![AI Policy Writer](https://img.shields.io/badge/Status-MVP-green)
![Python](https://img.shields.io/badge/Python-3.9+-blue)
![React](https://img.shields.io/badge/React-18.2-61dafb)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688)

## 🎯 Features

- **23-Question Questionnaire**: Comprehensive form covering company info, IT infrastructure, and policy preferences
- **Conditional Logic**: Dynamic form fields and validation based on responses
- **Smart Policy Generation**: Applies conditional rules to customize policy content
- **Professional Word Documents**: Generates properly formatted .docx files with headers, lists, and tables
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Conflict Detection**: Validates responses to prevent policy conflicts (e.g., BYOD with MDM requirements)

## 🏗️ Tech Stack

### Backend
- **FastAPI** (Python) - High-performance API framework
- **SQLite** - Lightweight database for storing organizations and policies
- **python-docx** - Word document generation
- **Jinja2** - Template rendering (available but document generation is native)

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Axios** - HTTP client

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Python 3.9 or higher**
- **Node.js 18 or higher** and npm
- **Git** (for cloning the repository)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create a virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Initialize the database
cd ..
python init_db.py

# Start the backend server (from project root)
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The backend API will be available at `http://localhost:8000`

### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## 📁 Project Structure

```
ai-policy-writer/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI application & routes
│   │   ├── database.py          # Database initialization and connection
│   │   ├── models.py            # Pydantic models for request/response
│   │   └── policy_generator.py # Document generation logic
│   ├── requirements.txt         # Python dependencies
│   └── .env.example            # Environment variables template
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ProgressBar.jsx  # Multi-step progress indicator
│   │   ├── pages/
│   │   │   ├── Landing.jsx      # Home page
│   │   │   ├── Questionnaire.jsx # 23-question form
│   │   │   └── Generate.jsx     # Policy generation & download
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx            # React entry point
│   │   └── index.css           # Tailwind CSS
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── generated_policies/          # Generated .docx files (created automatically)
├── init_db.py                  # Database initialization script
├── policy_writer.db            # SQLite database (created automatically)
└── README.md                   # This file
```

## 🗄️ Database Schema

### Organizations Table
```sql
CREATE TABLE organizations (
    id TEXT PRIMARY KEY,
    company_name TEXT NOT NULL,
    industry TEXT NOT NULL,
    size TEXT NOT NULL,
    employee_count INTEGER,
    has_mfa BOOLEAN,
    has_password_manager BOOLEAN,
    has_mdm BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Questionnaire Responses Table
```sql
CREATE TABLE questionnaire_responses (
    id TEXT PRIMARY KEY,
    org_id TEXT REFERENCES organizations(id),
    responses TEXT,  -- JSON string of all answers
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Policies Table
```sql
CREATE TABLE policies (
    id TEXT PRIMARY KEY,
    org_id TEXT REFERENCES organizations(id),
    policy_type TEXT DEFAULT 'acceptable_use',
    document_path TEXT,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔌 API Endpoints

### `POST /api/organizations`
Create a new organization record.

**Request Body:**
```json
{
  "company_name": "Acme Corp",
  "industry": "Technology",
  "size": "IG2 (500-5000 employees)",
  "employee_count": 1200,
  "has_mfa": true,
  "has_password_manager": true,
  "has_mdm": true
}
```

**Response:**
```json
{
  "org_id": "uuid-here",
  "created_at": "2025-10-21T12:00:00"
}
```

### `POST /api/questionnaire/submit`
Submit questionnaire responses.

**Request Body:**
```json
{
  "org_id": "uuid-here",
  "responses": {
    "q1_company_name": "Acme Corp",
    "q2_industry": "Technology",
    ...
  }
}
```

**Response:**
```json
{
  "questionnaire_id": "uuid-here",
  "status": "completed"
}
```

### `POST /api/policies/generate`
Generate a policy document.

**Request Body:**
```json
{
  "org_id": "uuid-here",
  "questionnaire_id": "uuid-here"
}
```

**Response:**
```json
{
  "policy_id": "uuid-here",
  "document_url": "/download/policies/Acme_Corp_Acceptable_Use_Policy_2025.docx",
  "filename": "Acme_Corp_Acceptable_Use_Policy_2025.docx"
}
```

### `GET /download/policies/:filename`
Download a generated policy document.

## 📝 The 23 Questions

### Section 1: Company Information (5 questions)
1. Company name
2. Industry (Healthcare, Finance, Technology, Retail, Government, Other)
3. Company size (IG1, IG2, IG3)
4. Employee count
5. Compliance requirements (HIPAA, PCI-DSS, GDPR, SOC2, None)

### Section 2: IT Infrastructure (10 questions)
6. Have IT department? (Yes/No)
7. IT contact email
8. IT contact phone (optional)
9. Have MFA solution? (Yes/No)
10. MFA provider name (conditional)
11. Have password manager? (Yes/No)
12. Password manager name (conditional)
13. Have MDM? (Yes/No)
14. Remote work policy (Fully remote, Hybrid, Office only, Not allowed)
15. Have cyber insurance? (Yes/No)

### Section 3: Policy Preferences (8 questions)
16. Personal use of devices (Prohibited, Minimal, Limited, Reasonable)
17. Check personal email on work devices? (Yes/No)
18. Visit personal websites on work devices? (Yes/No)
19. Browser sync policy (Prohibited, Enterprise accounts only, Allowed)
20. Cloud storage for work data (Prohibited, Approved platforms only, Allowed)
21. Monitor internet/email? (Yes actively, Yes for investigations, No)
22. Social media representation (Authorized only, No one, All with guidelines)
23. BYOD policy (Not allowed, Allowed with MDM, Guest network only)

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
DATABASE_URL=sqlite:///./policy_writer.db
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
GENERATED_POLICIES_DIR=./generated_policies
```

### Frontend Configuration

The Vite configuration automatically proxies API requests to the backend:

```javascript
// vite.config.js
server: {
  port: 5173,
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true,
    },
    '/download': {
      target: 'http://localhost:8000',
      changeOrigin: true,
    }
  }
}
```

## 🧪 Testing the Application

### Manual Testing Flow

1. **Landing Page**: Navigate to `http://localhost:5173`
2. **Click "Generate Your First Policy"**
3. **Fill out Section 1** (Company Information):
   - Enter company details
   - Click "Next"
4. **Fill out Section 2** (IT Infrastructure):
   - Answer IT-related questions
   - Conditional fields appear based on answers
   - Click "Next"
5. **Fill out Section 3** (Policy Preferences):
   - Set policy preferences
   - If BYOD = "Allowed with MDM" but MDM = "No", see validation error
   - Click "Generate Policy"
6. **Generation Page**:
   - See loading spinner
   - Wait 10-15 seconds
   - See success message with download button
7. **Download the Document**:
   - Click "Download Word Document"
   - Open the .docx file
   - Verify it's a professionally formatted policy document

### Expected Output

The generated Word document should include:
- Company name in title
- Current date
- Purpose and applicability sections
- Policy sections with conditional content based on answers
- Properly formatted lists and tables
- 8-12 pages depending on options selected

## 🚨 Troubleshooting

### Backend Issues

**Database not found:**
```bash
python init_db.py
```

**Port 8000 already in use:**
```bash
# Change port in uvicorn command
uvicorn app.main:app --reload --port 8001
# Update frontend proxy in vite.config.js
```

**Module import errors:**
```bash
# Ensure you're in the backend directory and venv is activated
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

### Frontend Issues

**Port 5173 already in use:**
```bash
# Vite will automatically suggest an alternative port
# Or specify a different port in package.json
```

**Axios network errors:**
- Ensure backend is running on port 8000
- Check that CORS is properly configured
- Verify the proxy settings in `vite.config.js`

**Module not found errors:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## 🔐 Security Considerations

**For Production Deployment:**
1. Use environment variables for sensitive configuration
2. Implement authentication and authorization
3. Add rate limiting to API endpoints
4. Use HTTPS for all communications
5. Sanitize user inputs
6. Use a production-grade database (PostgreSQL, MySQL)
7. Implement proper error handling and logging
8. Add CSRF protection
9. Set up proper CORS policies
10. Regularly update dependencies

## 📦 Production Deployment

### Backend (Vercel/Railway/Render)

1. Update database to PostgreSQL or similar
2. Set environment variables in platform
3. Deploy using platform-specific instructions
4. Update CORS_ORIGINS to include production frontend URL

### Frontend (Vercel/Netlify)

1. Update API base URL in axios configuration
2. Build the application:
   ```bash
   npm run build
   ```
3. Deploy the `dist` folder
4. Configure redirects for SPA routing

## 🛣️ Roadmap

- [ ] Add user authentication
- [ ] Support for multiple policy types (Privacy Policy, Data Retention, etc.)
- [ ] Policy version management
- [ ] Email delivery of generated policies
- [ ] Template customization interface
- [ ] Multi-language support
- [ ] PDF export option
- [ ] Policy comparison tool
- [ ] Integration with policy management platforms

## 🤝 Contributing

This is an MVP project. To contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is for demonstration purposes. Please add an appropriate license before production use.

## 👥 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Open an issue in the repository

---

**Built with ❤️ for cybersecurity professionals**

