# ⚡ Share AccuSights with Ngrok (Instant - No Deployment)

## What is Ngrok?
Share your **locally running** app with anyone via a public URL. No deployment needed!

**Perfect for:**
- ✅ Quick team demos
- ✅ Testing before deployment
- ✅ Showing work in progress
- ✅ No need to deploy anywhere

---

## 🚀 Quick Start (2 Minutes)

### Step 1: Install Ngrok

```bash
# Install ngrok
npm install -g ngrok

# Or download from: https://ngrok.com/download
```

### Step 2: Start Your Servers

**Terminal 1 - Backend:**
```bash
cd backend
venv\Scripts\activate
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 3: Expose Backend

**Terminal 3:**
```bash
ngrok http 8000
```

You'll see:
```
Forwarding  https://1234-xx-xx.ngrok.io -> http://localhost:8000
```

**Copy this URL!** (e.g., `https://1234-xx-xx.ngrok.io`)

### Step 4: Update Frontend

Stop frontend (Ctrl+C), then:

```bash
# Set backend URL
set VITE_API_URL=https://1234-xx-xx.ngrok.io

# Restart frontend
npm run dev
```

### Step 5: Expose Frontend

**Terminal 4:**
```bash
ngrok http 5173
```

You'll see:
```
Forwarding  https://5678-yy-yy.ngrok.io -> http://localhost:5173
```

### Step 6: Share with Team! 🎉

**Send this URL:** `https://5678-yy-yy.ngrok.io`

Your team can access your app from anywhere!

---

## 🎯 Even Simpler: One-Line Script

Create `share_app.bat` (Windows):

```batch
@echo off
echo Starting AccuSights...

start "Backend" cmd /k "cd backend && venv\Scripts\activate && uvicorn app.main:app --host 0.0.0.0 --port 8000"
timeout /t 5

start "Backend Ngrok" cmd /k "ngrok http 8000"
timeout /t 5

start "Frontend" cmd /k "cd frontend && npm run dev"
timeout /t 5

start "Frontend Ngrok" cmd /k "ngrok http 5173"

echo.
echo ========================================
echo AccuSights is starting!
echo.
echo 1. Wait for ngrok terminals to show URLs
echo 2. Copy the frontend ngrok URL
echo 3. Share with your team!
echo ========================================
```

**Run:** Double-click `share_app.bat`

---

## 💡 Pros & Cons

### Pros:
- ✅ **Instant** - No deployment time
- ✅ **Free** - No hosting costs
- ✅ **Easy** - Just run commands
- ✅ **Live updates** - Changes reflect immediately
- ✅ **No GitHub** - Run from your computer

### Cons:
- ⚠️ **Requires your computer** - Must keep running
- ⚠️ **URLs change** - New URLs each time you restart
- ⚠️ **Free limits** - 40 connections/minute on free tier
- ⚠️ **Not for production** - Good for demos only

---

## 🔐 Ngrok Tips

### Get Consistent URLs:
Sign up for ngrok account (free):
```bash
ngrok authtoken YOUR_AUTH_TOKEN
```

Then you can use custom subdomains (paid) or reserved domains.

### Keep URLs Consistent:
Ngrok Pro ($8/month) gives you:
- Fixed URLs that don't change
- Custom domains
- More connections

---

## 📊 Comparison

| Method | Time | Stays On | Cost | Good For |
|--------|------|----------|------|----------|
| **Ngrok** | 1 min | While PC on | Free | Quick demos |
| Replit | 2 min | Always | Free | Team sharing |
| Vercel CLI | 5 min | Always | Free | Professional |

---

## 🆘 Troubleshooting

**"Ngrok command not found"**
→ Install: `npm install -g ngrok` or download from ngrok.com

**"Connection refused"**
→ Make sure your servers are running first (backend on 8000, frontend on 5173)

**"Too many connections"**
→ Free tier limit reached, upgrade to paid or try later

**"URL expired"**
→ Ngrok free URLs expire after 2 hours, restart ngrok

---

## ✅ Best Practice

**For Team Demo Session:**

1. **Schedule demo time** with team
2. **Start everything** 5 minutes before
3. **Test the ngrok URL** yourself first
4. **Share URL** in meeting
5. **Demo live** with ability to make changes
6. **Stop servers** after demo

**Perfect for:** Sprint demos, client previews, quick team reviews

---

Want to deploy permanently instead? Check:
- `DEPLOY_WITHOUT_GITHUB.md` - Replit and CLI options
- `RENDER_DEPLOY.md` - Render.com deployment
- `HOSTING_COMPARISON.md` - All hosting options

