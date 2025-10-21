# Quick Start Guide

Get up and running in 5 minutes!

## Prerequisites
- Python 3.9+
- Node.js 18+

## Setup

### 1. Backend (Terminal 1)
```bash
cd backend
python -m venv venv

# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
cd ..
python init_db.py
cd backend
uvicorn app.main:app --reload --port 8000
```

### 2. Frontend (Terminal 2)
```bash
cd frontend
npm install
npm run dev
```

### 3. Open Browser
Visit: `http://localhost:5173`

## Test Flow

1. Click "Generate Your First Policy"
2. Fill out the 3 sections (23 questions total)
3. Click "Generate Policy"
4. Download the Word document

## Minimal Test Data

**Section 1:**
- Company: "Test Corp"
- Industry: Technology
- Size: IG1
- Employees: 50
- Compliance: None

**Section 2:**
- IT Dept: Yes
- Email: it@test.com
- MFA: No
- Password Manager: No
- MDM: No
- Remote Work: Office only
- Cyber Insurance: No

**Section 3:**
- Personal Use: Minimal
- Personal Email: No
- Personal Websites: No
- Browser Sync: Prohibited
- Cloud Storage: Prohibited
- Monitoring: Yes, for investigations
- Social Media: Authorized only
- BYOD: Not allowed

Click "Generate Policy" and download!

## Troubleshooting

**Backend won't start?**
- Check if port 8000 is available
- Verify venv is activated (see `(venv)` in prompt)

**Frontend won't start?**
- Delete `node_modules` and run `npm install` again
- Check if port 5173 is available

**Can't generate policy?**
- Check backend terminal for errors
- Verify database file `policy_writer.db` exists
- Try restarting both servers

## Next Steps
- Read full [README.md](README.md) for detailed docs
- Check [SETUP.md](SETUP.md) for comprehensive setup guide
- Explore API docs at `http://localhost:8000/docs`

