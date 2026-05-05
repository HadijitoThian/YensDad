# 🚀 DEPLOYMENT IN PROGRESS

**Status:** Git initialized locally ✅  
**Next:** Push to GitHub + Deploy

---

## STEP 1: Create GitHub Repository (2 minutes)

**Go to:** https://github.com/new

**Fill in:**
- Repository name: `Yens-Dad-Project`
- Description: `Communication app for non-verbal stroke patients`
- Public (for collaboration)
- Click "Create repository"

**Copy the HTTPS URL** (looks like: `https://github.com/YOUR_USERNAME/Yens-Dad-Project.git`)

---

## STEP 2: Push to GitHub (1 minute)

**In PowerShell, run these commands:**

```powershell
cd C:\Users\GTi15\.openclaw\workspace\Yens-Dad-Project

# Replace YOUR_USERNAME and YOUR_REPO_URL with actual values
git remote add origin https://github.com/YOUR_USERNAME/Yens-Dad-Project.git
git branch -M main
git push -u origin main
```

**Wait for it to complete.**

---

## STEP 3: Deploy Backend to Railway (5 minutes)

1. Go to **https://railway.app**
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Find and select `Yens-Dad-Project`
6. Click "Deploy"
7. Railway will automatically detect `railway.json` and deploy
8. **Wait for deployment to complete** (green checkmark)
9. **Copy the API URL** from Railway dashboard (e.g., `https://yens-dad-api.railway.app`)

---

## STEP 4: Deploy Frontend to Vercel (5 minutes)

1. Go to **https://vercel.com/new**
2. Sign in with GitHub
3. Select `Yens-Dad-Project`
4. **Project Settings:**
   - Framework: **Vite**
   - Build Command: `cd frontend && npm install && npm run build`
   - Output Directory: `frontend/dist`
   - Root Directory: (leave empty)
5. **Environment Variables:**
   - Key: `VITE_API_URL`
   - Value: (paste the Railway API URL from Step 3)
6. Click "Deploy"
7. **Wait for deployment** (green "Production" badge)
8. **Copy the frontend URL** (e.g., `https://yens-dad.vercel.app`)

---

## STEP 5: Test Live (5 minutes)

### Test Backend
```
Visit: https://your-railway-url.railway.app/api/health

Expected response:
{
  "status": "ok",
  "message": "Backend berjalan dengan baik"
}
```

### Test Frontend
1. Open: `https://your-vercel-url.vercel.app`
2. See the alphabet board?
3. Click some letters
4. See message building?
5. Click "Dengar" → hear text-to-speech?
6. Click "Kirim" → message saved?

✅ **If yes to all: DEPLOYED SUCCESSFULLY!**

---

## DONE! 🎉

Your app is now **LIVE on the internet!**

Share the frontend URL with family:
```
https://your-vercel-url.vercel.app
```

---

## Troubleshooting

### "Cannot find module" on Railway
- Make sure `backend/src/index.js` exists
- Check railway.json start command

### "VITE_API_URL not working" on Vercel
- Verify environment variable is set
- Check the API URL is correct
- Refresh page after deploying

### "Text-to-speech not working on live app"
- Must be HTTPS (✅ Vercel is HTTPS)
- Must allow Web Speech API
- Try Chrome/Firefox (not Safari)

---

## Timeline

```
✅ Git initialized locally
⏳ Push to GitHub (5 min)
⏳ Deploy to Railway (5 min)
⏳ Deploy to Vercel (5 min)
⏳ Test live (5 min)
= Total: ~20 minutes
```

---

## Next Steps After Deployment

1. **Share with family:** Give them the Vercel URL
2. **Collect feedback:** What works? What doesn't?
3. **Monitor:** Check Railway/Vercel dashboards daily
4. **Iterate:** Fix bugs, add phrases, improve

---

**Ready? Start with Step 1 above! 🚀**
