# AccuSights AI Policy Writer

> AI-powered cybersecurity policy generator that creates professional, CIS Controls-aligned policies in minutes.

[![Python](https://img.shields.io/badge/Python-3.11+-blue)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18.2-61dafb)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688)](https://fastapi.tiangolo.com/)
[![License](https://img.shields.io/badge/License-Private-red)]()

---

## 🎯 Overview

**AccuSights** generates customized cybersecurity policies based on your organization's specific requirements. Answer a guided questionnaire and receive professional Word documents ready for implementation.

### Current Features

- ✅ **Acceptable Use Policy** - Device usage and behavior guidelines
- 🚧 **Account Management Policy** - Password, MFA, and access control (in development)
- 🚧 **Incident Response Policy** - Breach response procedures (in development)

---

## 🚀 Quick Start

### Prerequisites

- Python 3.11+
- Node.js 18+
- npm

### Setup

```bash
# 1. Backend
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
pip install -r requirements.txt
python ../init_db.py
uvicorn app.main:app --reload --port 8000

# 2. Frontend (new terminal)
cd frontend
npm install
npm run dev
```

**Access:** http://localhost:5173

---

## 📦 Tech Stack

**Backend:** FastAPI, SQLite, python-docx  
**Frontend:** React, Vite, Tailwind CSS  
**Features:** Dynamic questionnaires, conditional logic, Word document generation

---

## 🏗️ Project Structure

```
accusights/
├── backend/              # FastAPI application
│   ├── app/
│   │   ├── main.py      # API routes
│   │   ├── database.py  # Database setup
│   │   └── policy_generator.py  # Document generation
│   └── requirements.txt
├── frontend/            # React application
│   ├── src/
│   │   ├── pages/       # Landing, PolicySelection, Questionnaire, Generate
│   │   └── components/  # Reusable components
│   └── package.json
└── init_db.py          # Database initialization
```

---

## 🎨 Features

- **Policy Selection** - Choose which policies to generate (1-3)
- **Smart Questionnaire** - 23-45 questions with conditional logic
- **Real-time Validation** - Conflict detection (e.g., BYOD requires MDM)
- **Professional Output** - Formatted Word documents with branding
- **CIS Controls** - Based on industry-standard templates
- **Responsive Design** - Works on all devices

---

## 🚢 Deployment

### Render.com (Recommended)

```bash
# Push to GitHub
git push origin main

# Deploy via Render Blueprint
# Connect your repo at render.com
# render.yaml is already configured
```

See `RENDER_DEPLOY.md` for detailed instructions.

### Other Options

- **Vercel + Railway** - See `DEPLOYMENT_GUIDE.md`
- **Fly.io** - See `HOSTING_COMPARISON.md`
- **Local sharing** - See `NGROK_DEPLOY.md`

---

## 📖 Documentation

- `START_HERE.md` - Complete overview
- `SETUP.md` - Detailed setup guide
- `DEPLOYMENT_GUIDE.md` - Production deployment
- `RENDER_DEPLOY.md` - Render-specific guide
- `QUICK_DEPLOY.md` - 5-minute quick start

---

## 🔐 Security Notes

- Environment variables for sensitive config
- CORS properly configured
- Input validation throughout
- SQLite for development (upgrade to PostgreSQL for production)

---

## 🛣️ Roadmap

- [x] Acceptable Use Policy generation
- [x] Policy selection interface
- [x] AccuSights branding
- [ ] Account & Credential Management Policy
- [ ] Incident Response Policy
- [ ] Multiple policy generation
- [ ] PDF export option
- [ ] User authentication
- [ ] Policy version management

---

## 📄 License

Private project - All rights reserved © 2025 AccuSights

---

## 🤝 Contributing

This is a private MVP. For access or questions, contact the repository owner.

---

## 📞 Support

For issues or questions, please contact the project maintainer.

---

**Built with ❤️ by Prashanth Pilla**  
*Powered by AccuSights | Based on CIS Critical Security Controls*
