# Railway Deployment - Manual Steps

## GitHub Repo Status ✅
- Repository: https://github.com/HadijitoThian/YenDad
- Branch: main
- Code: Pushed and ready

---

## Railway Deployment (5 minutes)

### Step 1: Go to Railway Dashboard
1. Visit: https://railway.app/dashboard
2. You should already be logged in
3. Click **"New"** button (top right)

### Step 2: Deploy from GitHub
1. From the templates dropdown, select: **"GitHub Repository"**
2. Search for: **YenDad** (or HadijitoThian/YenDad)
3. If you don't see it:
   - Click **"Configure GitHub App"**
   - Authorize Railway to access your repos
   - Go back and select YenDad
4. Click to select the repository

### Step 3: Railway Auto-Deploy
Once selected:
1. Railway will detect the `railway.json` file
2. It will automatically:
   - Detect Node.js backend
   - Set up the start command
   - Build and deploy
3. **Wait for the green checkmark** (2-3 minutes)

### Step 4: Get Your API URL
1. Once deployed, go to the service settings
2. Find the **"Public URL"** or **"Domain"**
3. It will look like: `https://yendad-api.railway.app`
4. **Copy this URL** - you'll need it for Vercel

---

## If Deployment Succeeds ✅

You'll see:
- Green "Healthy" status
- A public URL like: `https://yendad-api-production.up.railway.app`
- Active deployment logs

**Test it:**
```
Visit: https://your-railway-url/api/health

Should return:
{
  "status": "ok",
  "message": "Backend berjalan dengan baik"
}
```

---

## If Deployment Fails ❌

Common issues:

### Issue 1: Repository Not Found
**Solution:**
1. Make sure the repo is PUBLIC (not private)
2. Click "Configure GitHub App" 
3. Grant access to all repositories

### Issue 2: Build Fails
**Check the logs in Railway:**
1. Go to the deployment
2. Click "Build Logs"
3. Look for errors
4. Common fix: `railway.json` might need adjustment

If backend/src/index.js doesn't exist, that's the issue.

### Issue 3: Port Error
**Solution:**
- Railway will assign a PORT automatically
- The code should already use `process.env.PORT || 5000`
- Check `backend/src/index.js` line 1

---

## Next Step: Vercel Deployment

Once Railway is deployed and you have the API URL:

1. Go to https://vercel.com/new
2. Import your YenDad repository
3. Configure:
   - Framework: **Vite**
   - Build Command: `cd frontend && npm install && npm run build`
   - Output Directory: `frontend/dist`
   - Environment Variable: `VITE_API_URL` = [Your Railway URL]
4. Click Deploy

---

## Full URL Examples

**After Railway:**
```
Backend API: https://yendad-api-production.up.railway.app
Health Check: https://yendad-api-production.up.railway.app/api/health
```

**After Vercel:**
```
Frontend App: https://yendad.vercel.app
Direct Access: https://yendad.vercel.app (give this to family!)
```

---

## Troubleshooting

**Q: "No repositories found"**
A: Click "Configure GitHub App" to authorize access

**Q: Build takes too long**
A: Normal - first build can take 3-5 minutes. Wait.

**Q: Deployment succeeded but app doesn't work**
A: Check if `VITE_API_URL` environment variable is set in Vercel

**Q: Getting "Unhealthy" status**
A: Check Railway logs - likely a port or start command issue

---

## Support Links

- Railway Docs: https://docs.railway.com
- Railway Dashboard: https://railway.app/dashboard
- Your Project (after deploy): https://railway.app/project/[will show after deploy]

---

## Success Checklist

- [ ] GitHub repo is public
- [ ] Code pushed to main branch
- [ ] Railway project created
- [ ] Deployment shows "Healthy"
- [ ] API URL obtained
- [ ] Health endpoint tested (`/api/health`)
- [ ] Ready for Vercel deployment

---

Once the backend is deployed on Railway, let me know the API URL and I'll help with the Vercel frontend deployment!
