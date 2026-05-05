# GitHub Setup - Yens Dad Project

## Quick Git Commands

### Step 1: Initialize Git (One-time)

```bash
cd Yens-Dad-Project
git init
git add .
git commit -m "Initial commit: Yens Dad Communication App MVP"
```

### Step 2: Create Repo on GitHub

1. Go to https://github.com/new
2. Repository name: `Yens-Dad-Project`
3. Description: `Communication app for non-verbal stroke patients (75+ years old)`
4. **Public** (for collaboration)
5. Click "Create repository"
6. Copy the HTTPS URL (e.g., `https://github.com/YOUR_USERNAME/Yens-Dad-Project.git`)

### Step 3: Connect Local to Remote

```bash
git remote add origin https://github.com/YOUR_USERNAME/Yens-Dad-Project.git
git branch -M main
git push -u origin main
```

### Step 4: Verify

```bash
git status
# Should show: "On branch main, nothing to commit"

git remote -v
# Should show: origin https://github.com/YOUR_USERNAME/Yens-Dad-Project.git
```

---

## Daily Workflow

### Make Changes

```bash
# Edit files as needed
# Then commit:

git add .
git commit -m "Update: Add new phrases or fix bug"
git push
```

### Pull Latest (if working on multiple machines)

```bash
git pull origin main
```

---

## Deployment Setup (After GitHub Push)

### Railway Backend

1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Authorize GitHub
5. Select `Yens-Dad-Project`
6. Railway auto-detects `railway.json` and deploys backend
7. Get API URL from Railway dashboard

### Vercel Frontend

1. Go to https://vercel.com/new
2. Click "Import from Git"
3. Find `Yens-Dad-Project`
4. **Project Settings:**
   - Framework Preset: **Vite**
   - Build Command: `cd frontend && npm install && npm run build`
   - Output Directory: `frontend/dist`
   - Root Directory: (leave empty)
5. **Environment Variables:**
   - Key: `VITE_API_URL`
   - Value: `https://your-railway-url.railway.app` (from Railway)
6. Click "Deploy"

---

## GitHub Branch Strategy (Optional)

```
main (production)
 ├─ dev (development)
 │  ├─ feature/large-fonts
 │  ├─ feature/more-phrases
 │  └─ fix/tts-lag
```

But for MVP, `main` branch only is fine.

---

## Collaboration

If working with family/team:

```bash
# Create a branch for your work
git checkout -b feature/new-feature-name

# Make changes, commit, push
git push origin feature/new-feature-name

# Create Pull Request on GitHub
# Ask for review before merging to main
```

---

## Troubleshooting

### "fatal: not a git repository"
```bash
cd Yens-Dad-Project
git init
```

### "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/Yens-Dad-Project.git
```

### Can't push to GitHub
```bash
# Check credentials
git config user.email
git config user.name

# Set if needed
git config user.email "your@email.com"
git config user.name "Your Name"
```

---

**Ready to push? Run the Step 1-3 commands above!**
