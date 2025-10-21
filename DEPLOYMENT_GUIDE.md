# AccuSights Deployment Guide

## 🚀 Deploy to Production (Vercel + Railway)

### Prerequisites
- GitHub account
- Vercel account (free tier is fine)
- Railway account (free tier is fine)

---

## Step 1: Prepare Your Code for Deployment

### A. Create a Git Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial AccuSights deployment"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/accusights.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy Backend to Railway

Railway is perfect for Python/FastAPI backends with persistent storage.

### A. Sign up for Railway
1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project"

### B. Deploy Backend
1. Click "Deploy from GitHub repo"
2. Select your AccuSights repository
3. Railway will auto-detect it's a Python app
4. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### C. Add Environment Variables in Railway
Go to your project → Variables → Add these:

```
DATABASE_URL=sqlite:///./policy_writer.db
CORS_ORIGINS=https://your-app.vercel.app,http://localhost:5173
GENERATED_POLICIES_DIR=./generated_policies
PORT=8000
```

### D. Get Your Backend URL
- After deployment, Railway will give you a URL like: `https://accusights-backend-production.up.railway.app`
- **SAVE THIS URL** - you'll need it for the frontend

---

## Step 3: Deploy Frontend to Vercel

### A. Update Frontend to Use Production API

Edit `frontend/vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:8000',
        changeOrigin: true,
      },
      '/download': {
        target: process.env.VITE_API_URL || 'http://localhost:8000',
        changeOrigin: true,
      }
    }
  },
  build: {
    outDir: 'dist'
  }
})
```

### B. Deploy to Vercel

**Option 1: Using Vercel CLI (Recommended)**

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to frontend folder
cd frontend

# Login to Vercel
vercel login

# Deploy (follow the prompts)
vercel

# For production deployment
vercel --prod
```

**Option 2: Using Vercel Website**

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New" → "Project"
4. Import your AccuSights repository
5. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

### C. Add Environment Variables in Vercel

In your Vercel project settings → Environment Variables:

```
VITE_API_URL=https://accusights-backend-production.up.railway.app
```

(Use your actual Railway backend URL)

### D. Redeploy

After adding environment variables, trigger a redeploy in Vercel dashboard.

---

## Step 4: Update Backend CORS

Once you have your Vercel frontend URL (e.g., `https://accusights.vercel.app`), update Railway environment variables:

```
CORS_ORIGINS=https://accusights.vercel.app,http://localhost:5173
```

Then redeploy on Railway.

---

## Step 5: Test Your Deployment

1. Visit your Vercel URL: `https://accusights.vercel.app`
2. Try the complete flow:
   - Select policies
   - Fill questionnaire
   - Generate and download policies
3. Check that downloads work properly

---

## 🎯 Share with Your Team

Once deployed, share these URLs:

**Production App:**
```
https://accusights.vercel.app
```

**API Docs (for developers):**
```
https://accusights-backend-production.up.railway.app/docs
```

---

## 📝 Alternative: All-in-One Vercel Deployment

If you want everything on Vercel (less recommended for Python):

### Convert Backend to Serverless Functions

1. Create `api` folder in project root
2. Move backend logic to serverless functions
3. Use Vercel Postgres or external database (SQLite won't work)

This is more complex. I recommend the Railway + Vercel approach above.

---

## 🔧 Troubleshooting

### Frontend can't reach backend
- Check CORS_ORIGINS includes your Vercel URL
- Verify VITE_API_URL in Vercel environment variables
- Check Railway logs for errors

### Database errors
- Railway provides persistent storage
- For production, consider upgrading to PostgreSQL
- Current SQLite setup works but isn't ideal for scale

### File downloads not working
- Ensure GENERATED_POLICIES_DIR has write permissions
- Railway provides ephemeral filesystem (files deleted on redeploy)
- For production, use S3 or similar cloud storage

### Build failures
- Check all dependencies in requirements.txt
- Verify Node version compatibility
- Check Railway and Vercel logs

---

## 🚀 Quick Deploy Commands

```bash
# 1. Commit and push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Deploy backend to Railway (use Railway dashboard)
# Follow Railway setup above

# 3. Deploy frontend to Vercel
cd frontend
vercel --prod
```

---

## 💡 Pro Tips

1. **Custom Domain:** Add your own domain in Vercel settings
2. **Environment Variables:** Never commit .env files with secrets
3. **Monitoring:** Use Railway and Vercel dashboards to monitor usage
4. **Scaling:** Both platforms auto-scale on free tier (with limits)
5. **Database:** Consider upgrading to PostgreSQL for production

---

## 📊 Free Tier Limits

**Vercel Free:**
- 100 GB bandwidth/month
- Unlimited projects
- 6,000 build minutes/month

**Railway Free Trial:**
- $5 credit/month
- Good for low-traffic apps
- Upgrade for production use

---

## 🔗 Useful Links

- Vercel Dashboard: https://vercel.com/dashboard
- Railway Dashboard: https://railway.app/dashboard
- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app

---

**Your AccuSights app is now ready for the world!** 🎉

