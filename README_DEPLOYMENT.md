# 🚀 AccuSights - Quick Deployment Guide

## ⚡ Fastest Path to Production

### 1️⃣ Push to GitHub (1 minute)

```bash
git init
git add .
git commit -m "AccuSights v1.0 - Ready for deployment"

# Create new repo on GitHub.com, then:
git remote add origin https://github.com/YOUR_USERNAME/accusights.git
git push -u origin main
```

### 2️⃣ Deploy Backend to Railway (2 minutes)

1. **Sign up:** https://railway.app (use GitHub login)
2. **Create Project:** "Deploy from GitHub repo"
3. **Select:** Your `accusights` repository  
4. **Configure:**
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

5. **Environment Variables:** (Railway Dashboard → Variables)
   ```
   DATABASE_URL=sqlite:///./policy_writer.db
   CORS_ORIGINS=https://your-app-name.vercel.app
   GENERATED_POLICIES_DIR=./generated_policies
   ```

6. **Copy your Railway URL:** `https://accusights-production-xxxx.up.railway.app`

### 3️⃣ Deploy Frontend to Vercel (2 minutes)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to frontend
cd frontend

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel --prod
```

**In Vercel Dashboard:**
- Go to your project → Settings → Environment Variables
- Add: 
  ```
  VITE_API_URL=https://your-railway-url.up.railway.app
  ```
- Redeploy

### 4️⃣ Update Backend CORS

Go back to Railway → Your project → Variables:
- Update `CORS_ORIGINS` to include your Vercel URL:
  ```
  CORS_ORIGINS=https://your-app.vercel.app,http://localhost:5173
  ```

### 5️⃣ Test & Share! 🎉

**Your live URL:** `https://your-app.vercel.app`

Share with your team and start generating policies!

---

## 📚 Detailed Guides

- **Quick Start:** `QUICK_DEPLOY.md` - 5 minute guide
- **Complete Guide:** `DEPLOYMENT_GUIDE.md` - All details + troubleshooting
- **Start Here:** `START_HERE.md` - Overview + what you need

---

## 🎯 What Your Team Gets

✅ **Professional Web App** at your custom URL  
✅ **Policy Selection** - Choose from 3 policy types  
✅ **Smart Questionnaire** - 23-45 questions based on selection  
✅ **Instant Generation** - Professional Word documents in seconds  
✅ **AccuSights Branding** - Your logo throughout  

---

## 💰 Cost

**Free Tier (Perfect for Teams):**
- Vercel: 100 GB bandwidth/month
- Railway: $5 credit/month
- **Total: $0-5/month**

**Production (If Needed):**
- Railway Pro: $5-20/month (always-on backend)
- Vercel Pro: $20/month (custom domain + more)

---

## 🔧 Tech Stack

**Frontend:** React + Vite + Tailwind CSS  
**Backend:** FastAPI (Python)  
**Database:** SQLite (upgrade to PostgreSQL for scale)  
**Hosting:** Vercel (frontend) + Railway (backend)  

---

## 🆘 Troubleshooting

### Frontend can't reach backend
→ Check `VITE_API_URL` in Vercel environment variables  
→ Verify `CORS_ORIGINS` in Railway includes Vercel URL

### Build errors
→ Check logs in Vercel/Railway dashboards  
→ Verify all dependencies installed

### Download not working  
→ Check Railway logs for Python errors  
→ Verify file permissions on Railway

**More help:** See `DEPLOYMENT_GUIDE.md` Section: Troubleshooting

---

## 📞 Support

**Your Team's Questions?**
- Send them this README
- Point them to your live URL
- Show them the quick guide below

**Your Questions?**
- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Check `DEPLOYMENT_GUIDE.md` for detailed help

---

## 🎓 Quick Guide for Your Team

**Using AccuSights:**

1. **Visit:** `https://your-app.vercel.app`
2. **Click:** "Generate Your Policies"
3. **Select:** Which policies you need (1-3)
4. **Answer:** Questions about your organization
5. **Download:** Professional Word documents
6. **Review:** Customize if needed
7. **Deploy:** Distribute to your organization

**Time:** 5-25 minutes depending on policies selected  
**Output:** Professional, CIS Controls-aligned policy documents

---

## 🚀 Next Steps After Deployment

1. ✅ **Test Complete Flow** - Generate all 3 policy types
2. ✅ **Custom Domain** - Add your company domain in Vercel
3. ✅ **Team Training** - Walk through the process once
4. ✅ **Gather Feedback** - Improve based on usage
5. ✅ **Scale** - Upgrade hosting if needed

---

## 📊 Architecture

```
User → Vercel (Frontend)
         ↓ API Calls
       Railway (Backend)
         ↓ Generates
       Word Documents
         ↓ Downloads
       User's Computer
```

**Scalable:** Both platforms auto-scale  
**Secure:** HTTPS everywhere  
**Fast:** Global CDN (Vercel) + optimized backend (Railway)

---

## ✨ Features Live in Production

✅ AccuSights branding with your logo  
✅ Policy selection (AUP, Account Mgmt, Incident Response)  
✅ Dynamic questionnaire (23-45 questions)  
✅ Professional Word document generation  
✅ CIS Controls alignment  
✅ Responsive design (mobile, tablet, desktop)  
✅ Error handling and validation  
✅ Professional UI/UX  

---

**Ready to deploy?** Open `START_HERE.md` or run:

```bash
# Quick deploy in 3 commands:
git push origin main
cd frontend && vercel --prod
# Then configure Railway via dashboard
```

**Questions?** Check the detailed guides or deployment documentation.

**Let's get AccuSights live! 🚀**

