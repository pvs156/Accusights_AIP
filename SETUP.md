# Setup Instructions

Follow these step-by-step instructions to get the AI Policy Writer MVP running on your local machine.

## Prerequisites Checklist

Before starting, ensure you have:
- [ ] Python 3.9 or higher installed
- [ ] Node.js 18 or higher installed
- [ ] npm or yarn package manager
- [ ] Terminal/Command Prompt access
- [ ] Text editor (VS Code, Sublime, etc.)

### Verify Prerequisites

```bash
# Check Python version
python --version
# Should output: Python 3.9.x or higher

# Check Node.js version
node --version
# Should output: v18.x.x or higher

# Check npm version
npm --version
# Should output: 9.x.x or higher
```

## Step-by-Step Setup

### Step 1: Project Setup

```bash
# Clone or navigate to the project directory
cd path/to/ai-policy-writer

# Verify project structure
ls
# Should see: backend/, frontend/, init_db.py, README.md
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Your prompt should now show (venv)

# Install Python dependencies
pip install -r requirements.txt

# Wait for installation to complete (may take 1-2 minutes)
```

### Step 3: Database Initialization

```bash
# Go back to project root
cd ..

# Run the database initialization script
python init_db.py

# You should see:
# "Initializing database..."
# "Database initialized successfully!"

# Verify database file was created
ls
# Should see: policy_writer.db
```

### Step 4: Start the Backend Server

```bash
# From project root, navigate back to backend
cd backend

# Make sure venv is still activated (you should see (venv) in prompt)
# If not, activate it again:
# venv\Scripts\activate (Windows) or source venv/bin/activate (macOS/Linux)

# Start the FastAPI server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# You should see output like:
# INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
# INFO:     Started reloader process
# INFO:     Started server process
# INFO:     Waiting for application startup.
# INFO:     Application startup complete.
```

**Test the backend:**
- Open a browser and go to: `http://localhost:8000`
- You should see: `{"status":"ok","message":"AI Policy Writer API is running"}`
- Visit the API docs: `http://localhost:8000/docs`

**Keep this terminal window open!** The backend server needs to keep running.

### Step 5: Frontend Setup (New Terminal Window)

Open a **new** terminal window (keep the backend running in the first one):

```bash
# Navigate to project directory
cd path/to/ai-policy-writer

# Navigate to frontend directory
cd frontend

# Install Node.js dependencies
npm install

# This will take 2-3 minutes to download and install packages
# You'll see a progress bar

# Wait for "added XXX packages" message
```

### Step 6: Start the Frontend Server

```bash
# Still in the frontend directory
npm run dev

# You should see output like:
# VITE v5.0.11  ready in XXX ms
# 
# ➜  Local:   http://localhost:5173/
# ➜  Network: use --host to expose
# ➜  press h to show help
```

### Step 7: Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

You should see the AI Policy Writer landing page with:
- Header: "AI Policy Writer"
- Hero text: "Generate Professional Cybersecurity Policies in Minutes"
- Three benefit cards (Fast, Customized, Compliant)
- "Generate Your First Policy" button

## Verification Checklist

Verify everything is working:

- [ ] Backend server is running on port 8000
- [ ] Frontend server is running on port 5173
- [ ] Landing page loads in browser
- [ ] No error messages in browser console (press F12)
- [ ] No error messages in backend terminal
- [ ] No error messages in frontend terminal
- [ ] Database file exists: `policy_writer.db`
- [ ] Generated policies directory will be created automatically

## Test the Complete Flow

1. **Landing Page**: Click "Generate Your First Policy"
2. **Questionnaire Page**: Should see "Company Information" section
3. **Fill Section 1**:
   - Company name: "Test Company"
   - Industry: Select "Technology"
   - Company size: Select "IG1 (<500 employees)"
   - Employee count: Enter "100"
   - Compliance: Select "None"
   - Click "Next"
4. **Fill Section 2**:
   - IT department: Select "Yes"
   - IT email: Enter "it@test.com"
   - IT phone: Enter "555-1234" (optional)
   - MFA: Select "Yes"
   - MFA name: Enter "Microsoft Authenticator"
   - Password manager: Select "Yes"
   - Password manager name: Enter "1Password"
   - MDM: Select "No"
   - Remote work: Select "Hybrid"
   - Cyber insurance: Select "No"
   - Click "Next"
5. **Fill Section 3**:
   - Personal use: Select "Minimal"
   - Personal email: Select "Yes"
   - Personal websites: Select "Yes"
   - Browser sync: Select "Prohibited"
   - Cloud storage: Select "Approved platforms only"
   - Monitoring: Select "Yes, for investigations"
   - Social media: Select "Authorized only"
   - BYOD: Select "Not allowed"
   - Click "Generate Policy"
6. **Generation Page**:
   - Should see loading spinner
   - Wait 10-15 seconds
   - Should see success message with green checkmark
   - Should see filename: "Test_Company_Acceptable_Use_Policy_2025.docx"
   - Click "Download Word Document"
7. **Verify Download**:
   - Document should download
   - Open the .docx file in Word or compatible software
   - Verify it's a professionally formatted policy document
   - Should see "Test Company Acceptable Use Policy" as title
   - Should have multiple sections with formatted lists

## Common Setup Issues

### Issue: "Python not found"
**Solution:**
- Install Python from python.org
- Make sure to check "Add Python to PATH" during installation
- Restart terminal after installation

### Issue: "npm not found"
**Solution:**
- Install Node.js from nodejs.org
- Node.js installer includes npm
- Restart terminal after installation

### Issue: "Port 8000 already in use"
**Solution:**
```bash
# Find and kill the process using port 8000
# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID_NUMBER> /F

# macOS/Linux:
lsof -ti:8000 | xargs kill -9
```

### Issue: "Port 5173 already in use"
**Solution:**
- Vite will automatically try the next available port (5174, 5175, etc.)
- Use the URL shown in the terminal output

### Issue: "ModuleNotFoundError" in Python
**Solution:**
```bash
# Make sure venv is activated
# Reinstall dependencies
pip install --upgrade pip
pip install -r requirements.txt
```

### Issue: "Module not found" in React
**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Issue: Database errors
**Solution:**
```bash
# Delete old database and reinitialize
rm policy_writer.db
python init_db.py
```

### Issue: CORS errors in browser
**Solution:**
- Verify backend is running
- Check that frontend proxy is configured in vite.config.js
- Restart both servers

## Environment Variables

### Backend `.env` (Optional)

Create `backend/.env` if you want to customize:

```env
DATABASE_URL=sqlite:///./policy_writer.db
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
GENERATED_POLICIES_DIR=./generated_policies
```

### Frontend Environment (Optional)

Create `frontend/.env.local` if deploying:

```env
VITE_API_URL=http://localhost:8000
```

## Next Steps

Once setup is complete:
1. Read the [README.md](README.md) for detailed documentation
2. Explore the API docs at `http://localhost:8000/docs`
3. Test all questionnaire paths
4. Customize the policy template in `backend/app/policy_generator.py`
5. Modify the UI in `frontend/src/`

## Getting Help

If you encounter issues:
1. Check this SETUP.md file first
2. Review error messages carefully
3. Check both terminal windows for errors
4. Try the "Common Setup Issues" solutions
5. Restart both servers
6. Clear browser cache and retry

## Shutting Down

When you're done:

1. **Stop Frontend**: In the frontend terminal, press `Ctrl+C`
2. **Stop Backend**: In the backend terminal, press `Ctrl+C`
3. **Deactivate venv**: Type `deactivate` in backend terminal

To start again later:
```bash
# Terminal 1 - Backend
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Terminal 2 - Frontend
cd frontend
npm run dev
```

---

**You're all set! Happy policy generation! 🚀**

