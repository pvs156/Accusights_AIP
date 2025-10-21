# 🚀 Quick Deploy AccuSights (5 Minutes)

## Prerequisites
- GitHub account
- Vercel account
- Railway account

---

## Step 1: Push to GitHub (2 min)

```bash
# Initialize git
git init
git add .
git commit -m "AccuSights v1.0"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/accusights.git
git push -u origin main
```

---

## Step 2: Deploy Backend to Railway (2 min)

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select your `accusights` repo
4. Set Root Directory: `backend`
5. Add environment variables:
   ```
   CORS_ORIGINS=https://YOUR_APP.vercel.app
   DATABASE_URL=sqlite:///./policy_writer.db
   ```
6. Copy your Railway URL (e.g., `accusights-production.up.railway.app`)

---

## Step 3: Deploy Frontend to Vercel (1 min)

```bash
cd frontend

# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# When prompted:
# - Project name: accusights
# - Root directory: ./frontend
# - Build command: npm run build
# - Output directory: dist
```

Then add environment variable in Vercel dashboard:
```
VITE_API_URL=https://YOUR_RAILWAY_URL
```

---

## Step 4: Share with Team

Send them: `https://your-app.vercel.app`

Done! 🎉

