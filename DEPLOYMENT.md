# Deployment Guide - Yens Dad Project

## Prasyarat

- Git account (GitHub)
- Railway account (railway.app)
- Vercel account (vercel.com)
- Node.js 18+ installed locally

---

## STEP 1: Setup Git Repository

### 1.1 Initialize Git
```bash
cd Yens-Dad-Project
git init
git add .
git commit -m "Initial commit: Yens Dad Communication App"
```

### 1.2 Create GitHub Repository
1. Go to https://github.com/new
2. Name: `Yens-Dad-Project`
3. Description: "Communication app untuk ayah Yens"
4. Public (untuk kolaborasi)
5. Create repository

### 1.3 Push ke GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/Yens-Dad-Project.git
git branch -M main
git push -u origin main
```

---

## STEP 2: Deploy Backend ke Railway

### 2.1 Sign in Railway
1. Go to https://railway.app
2. Sign in dengan GitHub

### 2.2 Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Find `Yens-Dad-Project`
4. Connect repo

### 2.3 Configure Environment
1. Go to project settings
2. Add environment variables:
   - `PORT`: 5000 (atau biarkan default)
   - `NODE_ENV`: production

### 2.4 Deploy
1. Railway otomatis build dan deploy saat push ke main
2. Tunggu deployment selesai
3. Copy API URL dari Railway dashboard (e.g., `https://yens-dad-api.railway.app`)

---

## STEP 3: Deploy Frontend ke Vercel

### 3.1 Sign in Vercel
1. Go to https://vercel.com/new
2. Sign in dengan GitHub

### 3.2 Import Project
1. Select `Yens-Dad-Project` repository
2. Framework: Vite
3. Build settings:
   - Build command: `cd frontend && npm install && npm run build`
   - Output directory: `frontend/dist`
   - Root directory: (leave empty)

### 3.3 Add Environment Variables
1. Go to Environment Variables
2. Add:
   - `VITE_API_URL`: `https://yens-dad-api.railway.app` (dari Railway)

### 3.4 Deploy
1. Click "Deploy"
2. Vercel otomatis deploy saat push ke main
3. Copy frontend URL (e.g., `https://yens-dad.vercel.app`)

---

## STEP 4: Testing

### Test Backend
```bash
curl https://yens-dad-api.railway.app/api/health
# Expected: {"status":"ok","message":"Backend berjalan dengan baik"}
```

### Test Frontend
1. Buka https://yens-dad.vercel.app
2. Cek:
   - ✅ Alfabet board muncul
   - ✅ Frasa cepat muncul
   - ✅ Klik alfabet → pesan berkembang
   - ✅ Prediksi kata muncul
   - ✅ Tombol Kirim/Dengar berfungsi

---

## STEP 5: Continuous Deployment

**Setiap kali push ke main:**
1. Railway otomatis rebuild backend
2. Vercel otomatis rebuild frontend
3. Perubahan live dalam 2-3 menit

---

## Troubleshooting

### Frontend tidak bisa connect ke API
- Pastikan `VITE_API_URL` environment variable di Vercel sudah benar
- Check CORS di backend (`backend/src/index.js`)

### Text-to-speech tidak jalan
- Hanya berfungsi di HTTPS dan browser modern
- Test di browser terbaru (Chrome, Firefox, Edge)

### Deployment gagal
- Cek logs di Railway/Vercel dashboard
- Pastikan tidak ada syntax error di code

---

## Local Development

### Run Backend
```bash
cd backend
npm install
npm start
# Berjalan di http://localhost:5000
```

### Run Frontend
```bash
cd frontend
npm install
npm run dev
# Berjalan di http://localhost:5173
```

---

## Maintenance

### Update Dependencies
```bash
cd backend && npm update
cd frontend && npm update
git add .
git commit -m "Update dependencies"
git push
```

### Monitor Uptime
- Railway: https://railway.app/dashboard
- Vercel: https://vercel.com/dashboard

---

**Last Updated:** 2026-05-05
