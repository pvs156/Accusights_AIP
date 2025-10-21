# 🚀 Deploy AccuSights to Share with Your Team

## Fastest Way to Deploy (Choose One)

### Option A: Vercel (Frontend) + Railway (Backend) ⭐ RECOMMENDED

**Why?** Best performance, easiest setup, free tier works great.

**Steps:**
1. Read `QUICK_DEPLOY.md` (5-minute setup)
2. Follow the 4 simple steps
3. Share your Vercel URL with team

### Option B: Single Vercel Deployment

**Why?** Everything in one place (but requires serverless function setup)

**Steps:**
1. Convert backend to serverless functions
2. Deploy entire project to Vercel
3. More complex - use Option A instead

---

## What You'll Need

✅ **Accounts (All Free):**
- GitHub account (to store code)
- Vercel account (for frontend hosting)
- Railway account (for backend hosting)

✅ **Tools:**
- Git installed on your computer
- Vercel CLI: `npm install -g vercel`

---

## Files I Created for You

✅ **Deployment Configuration:**
- `vercel.json` - Vercel frontend config
- `backend/Procfile` - Railway backend config
- `backend/runtime.txt` - Python version for Railway
- `.gitignore` - What NOT to upload to GitHub

✅ **Documentation:**
- `DEPLOYMENT_GUIDE.md` - Complete step-by-step guide
- `QUICK_DEPLOY.md` - 5-minute quick start
- This file - START_HERE.md

---

## Quick Start (Right Now!)

### Step 1: Install Git (if needed)
- Windows: Download from https://git-scm.com/
- Already have it? Run `git --version` to check

### Step 2: Create GitHub Repository

```bash
# In your project folder:
git init
git add .
git commit -m "AccuSights initial commit"

# Go to github.com, create new repository called "accusights"
# Then run:
git remote add origin https://github.com/YOUR_USERNAME/accusights.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy Backend (Railway)

1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your `accusights` repository
6. In settings:
   - Root Directory: `backend`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
7. Add environment variables:
   ```
   DATABASE_URL=sqlite:///./policy_writer.db
   CORS_ORIGINS=https://your-app.vercel.app
   ```
8. **SAVE YOUR RAILWAY URL** (like: `https://accusights-production-xxxx.up.railway.app`)

### Step 4: Deploy Frontend (Vercel)

```bash
# Install Vercel CLI
npm install -g vercel

# Go to frontend folder
cd frontend

# Login and deploy
vercel login
vercel

# Answer the prompts:
# Project name: accusights
# Build command: npm run build
# Output directory: dist
```

### Step 5: Connect Them

1. Go to Vercel dashboard → Your project → Settings → Environment Variables
2. Add: `VITE_API_URL` = `https://your-railway-url.up.railway.app`
3. Redeploy in Vercel

4. Go to Railway dashboard → Your project → Variables
5. Update: `CORS_ORIGINS` = `https://your-vercel-url.vercel.app`

### Step 6: Share with Team! 🎉

Send them your Vercel URL:
```
https://accusights-your-name.vercel.app
```

---

## 📺 What Your Team Will See

1. **Landing Page** - AccuSights branding, "Generate Your Policies" button
2. **Policy Selection** - Choose 1-3 policies (AUP, Account Mgmt, Incident Response)
3. **Questionnaire** - Answer 23-45 questions
4. **Download** - Get professionally formatted Word documents

---

## 🆘 Need Help?

### Common Issues:

**"Cannot reach backend"**
- Check CORS_ORIGINS in Railway includes your Vercel URL
- Verify VITE_API_URL in Vercel environment variables

**"Build failed"**
- Check logs in Vercel/Railway dashboard
- Verify all dependencies in package.json and requirements.txt

**"Database errors"**
- Railway's SQLite is ephemeral (resets on redeploy)
- For production, consider PostgreSQL upgrade

### Where to Get Help:
- Check `DEPLOYMENT_GUIDE.md` for detailed troubleshooting
- Vercel support: https://vercel.com/support
- Railway docs: https://docs.railway.app

---

## 💰 Cost

**Free Tier Works Fine:**
- Vercel: 100GB bandwidth/month (plenty for team use)
- Railway: $5 credit/month (good for testing)
- Total: **$0-5/month** for small team

**Production Upgrade (if needed later):**
- Railway: $5-20/month for always-on backend
- Vercel Pro: $20/month for custom domain + more bandwidth

---

## 🔐 Security Notes

**Before sharing publicly:**
1. Don't commit `.env` files with secrets
2. Use environment variables for sensitive data
3. Consider adding authentication (not included in MVP)
4. Review CORS settings for production

---

## 🎯 Next Steps After Deployment

1. **Test everything** - Go through full policy generation flow
2. **Custom domain** - Add your company domain in Vercel
3. **Monitor usage** - Check Vercel and Railway dashboards
4. **Team training** - Show team how to use AccuSights
5. **Gather feedback** - Improve based on team input

---

## 📞 Support Your Team

Share these with your team:
- App URL: `https://your-app.vercel.app`
- Quick guide: "Click Generate → Select Policies → Answer Questions → Download"
- Support contact: Your email for questions

---

**Ready to deploy? Open `QUICK_DEPLOY.md` and follow the steps!** 🚀

**Questions? Check `DEPLOYMENT_GUIDE.md` for detailed instructions.**

