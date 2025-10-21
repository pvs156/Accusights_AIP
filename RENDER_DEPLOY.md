# 🚀 Deploy AccuSights to Render.com (Simplest Option)

## Why Render?
- ✅ **Both frontend & backend on ONE platform**
- ✅ **Completely free** (no credit card for free tier)
- ✅ **One link to share** with your team
- ✅ **Auto-deploy** from GitHub
- ✅ **Easier than Vercel + Railway**

---

## 🎯 Quick Deploy (10 Minutes)

### Step 1: Push to GitHub (2 min)

```bash
# Initialize and push
git init
git add .
git commit -m "AccuSights ready for Render"

# Create repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/accusights.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Render (5 min)

1. **Sign up:** Go to https://render.com (use GitHub login)

2. **New Blueprint:** 
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository
   - Render will detect `render.yaml` and set up everything automatically!

3. **Wait for deployment** (~5 minutes)
   - Backend will deploy first
   - Then frontend
   - Watch the logs in dashboard

4. **Get your URL:** 
   - Frontend URL: `https://accusights-frontend.onrender.com`
   - Backend URL: `https://accusights-backend.onrender.com`

### Step 3: Share with Team! 🎉

Send them: **`https://accusights-frontend.onrender.com`**

That's it! ✅

---

## 🎯 Alternative: Manual Setup (If Blueprint Doesn't Work)

### Deploy Backend First

1. **New Web Service:**
   - Repository: Your GitHub repo
   - Root Directory: `backend`
   - Environment: Python 3
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

2. **Environment Variables:**
   ```
   DATABASE_URL=sqlite:///./policy_writer.db
   CORS_ORIGINS=https://accusights-frontend.onrender.com
   GENERATED_POLICIES_DIR=./generated_policies
   ```

3. **Copy backend URL** (e.g., `https://accusights-backend.onrender.com`)

### Deploy Frontend

1. **New Static Site:**
   - Repository: Your GitHub repo
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`

2. **Environment Variable:**
   ```
   VITE_API_URL=https://accusights-backend.onrender.com
   ```

---

## ⚡ Even Faster: Replit (2-Minute Deploy)

If you want to demo **RIGHT NOW**:

### Option: Replit Deploy

1. Go to https://replit.com
2. Click "Create Repl"
3. Choose "Import from GitHub"
4. Paste your repo URL
5. Replit will auto-detect and run both servers
6. **Share link instantly:** `https://accusights.your-username.repl.co`

**Perfect for:**
- Quick team demos
- Testing before production
- Proof of concept

**Not ideal for:**
- High traffic (limited resources)
- Always-on production use

---

## 📊 Comparison

| Feature | Render.com | Vercel + Railway | Replit |
|---------|------------|------------------|--------|
| Setup Time | 10 min | 15 min | 2 min |
| Free Tier | ✅ Yes | ✅ Yes | ✅ Yes |
| Both Services | ✅ One platform | ❌ Split | ✅ One platform |
| Auto-deploy | ✅ Yes | ✅ Yes | ✅ Yes |
| Always On | ❌ Sleeps after 15min | ✅ Yes (Railway) | ❌ Limited |
| Database | ✅ Free PostgreSQL | ❌ Ephemeral SQLite | ❌ Limited |
| Custom Domain | ✅ Yes | ✅ Yes | ⚠️ Paid only |
| Team Sharing | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Production Ready | ✅ Yes | ✅ Yes | ⚠️ Limited |

**Winner: Render.com** for most cases ⭐

---

## 💰 Cost Comparison

### Render Free Tier:
- 750 hours/month (enough for team use)
- 100 GB bandwidth
- **Cost: $0/month** ✅

### Vercel + Railway:
- Vercel: 100 GB bandwidth
- Railway: $5 credit
- **Cost: $0-5/month**

### Replit:
- Limited resources
- Shared compute
- **Cost: $0/month** (upgrade for always-on: $7/month)

---

## 🔧 Render Pro Tips

### 1. Service Sleep & Wake
- **Free tier services sleep after 15 min of inactivity**
- First request after sleep takes ~30-60 seconds to wake up
- Subsequent requests are instant
- **Solution for team:** Pin the URL in Slack/Teams so it stays active

### 2. Upgrade to Stay Always-On
- **$7/month** for backend to never sleep
- Frontend static sites are always fast (no sleep)
- Only upgrade backend if needed

### 3. Custom Domain
- Free on Render!
- Go to Settings → Custom Domain
- Add: `accusights.yourdomain.com`

### 4. Logs & Monitoring
- Real-time logs in Render dashboard
- See all API requests
- Debug errors easily

---

## 🆘 Troubleshooting

### "Service unavailable" on first load
→ Normal! Service is waking up from sleep (~30 sec)

### CORS errors
→ Check backend environment variable `CORS_ORIGINS` includes frontend URL

### Build failures
→ Check logs in Render dashboard
→ Verify requirements.txt and package.json

### Database not persisting
→ Render's SQLite works but resets on redeploy
→ Upgrade to PostgreSQL (free!) for persistence

---

## 🎯 Best Practices

1. **Use Blueprint** (`render.yaml`) - Easiest deployment
2. **PostgreSQL** - Upgrade from SQLite for production
3. **Environment Variables** - Never commit secrets
4. **Custom Domain** - Add your company domain
5. **Monitor Usage** - Check dashboard regularly

---

## 📞 Share with Your Team

**Your live URL:** `https://accusights-frontend.onrender.com`

**How to use:**
1. Visit the URL
2. Click "Generate Your Policies"
3. Select policies (1-3)
4. Answer questions
5. Download Word documents

**First load note:** May take 30 seconds if service was sleeping. After that, instant! ⚡

---

## 🚀 Deploy Now!

```bash
# 1. Push to GitHub
git add render.yaml RENDER_DEPLOY.md
git commit -m "Add Render deployment"
git push origin main

# 2. Go to render.com
#    - New Blueprint
#    - Connect GitHub
#    - Deploy!

# 3. Share your link! 🎉
```

**Questions?** Render has great docs: https://render.com/docs

---

## 🎓 Next Steps

After deployment:
1. ✅ Test full policy generation flow
2. ✅ Share link with 2-3 team members first
3. ✅ Gather feedback
4. ✅ Consider upgrading backend to always-on ($7/month)
5. ✅ Add custom domain if needed

**Your AccuSights app is ready to share! 🚀**

