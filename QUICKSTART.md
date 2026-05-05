# Quick Start Guide - Yens Dad Project

## 🚀 Mulai dalam 5 Menit

### Prasyarat
- Node.js 18+ (download dari nodejs.org)
- Terminal/PowerShell

### STEP 1: Setup Backend (2 menit)

```bash
cd Yens-Dad-Project/backend
npm install
npm start
```

**Output:**
```
✅ Yens Dad Backend berjalan di http://localhost:5000
📡 API ready untuk frontend
🔗 Health check: http://localhost:5000/api/health
```

✅ Backend sudah jalan!

### STEP 2: Setup Frontend (3 menit)

**Di terminal baru, jangan tutup backend:**

```bash
cd Yens-Dad-Project/frontend
npm install
npm run dev
```

**Output:**
```
VITE v5.0.8  ready in XXX ms

➜  Local:   http://localhost:5173/
```

✅ Frontend sudah jalan!

### STEP 3: Test Aplikasi

1. Buka browser: http://localhost:5173
2. Lihat papan alfabet BESAR
3. Klik beberapa huruf: A, Y, A, H
4. Lihat pesan berkembang di kanan
5. Klik tombol "Dengar" untuk text-to-speech
6. Klik "Kirim" untuk save ke history

✅ Aplikasi berfungsi!

---

## 📱 Features yang Sudah Ada

### ✅ Alfabet Board
- 26 huruf BESAR
- 10 angka (0-9)
- Tanda baca: . , ! ? : ; - ( )
- Design besar untuk 75 tahun

### ✅ Prediksi Kata
- Klik A → saran: aku, ada, akan, ambil, etc.
- Top 6 prediksi per huruf
- Bahasa Indonesia penuh

### ✅ Frasa Cepat (15 frasa)
- Respons: Ya, Tidak, Baik
- Kebutuhan: Minum, Kamar mandi, Bantuan, Makanan
- Kesehatan: Sakit, Demam, Butuh obat, Panggil dokter
- Emosi: Lelah, Sayang, Terima kasih, Maaf

### ✅ Text-to-Speech
- Klik "Dengar" → aplikasi membaca pesan
- Bahasa: Indonesia
- Kecepatan: Lambat (mudah dipahami)

### ✅ Riwayat Pesan
- Setiap pesan yang dikirim disimpan
- Dengan waktu
- Bisa dilihat dalam grid

### ✅ Responsive Design
- Desktop
- Tablet
- Mobile (bisa gesture)

---

## 🔧 Struktur Folder

```
Yens-Dad-Project/
├── backend/               # Node.js + Express API
│   ├── src/
│   │   └── index.js      # Main server (alfabet, prediksi, frasa)
│   └── package.json
├── frontend/              # React + Vite
│   ├── src/
│   │   ├── App.jsx       # Main app logic
│   │   ├── components/
│   │   │   ├── AlphabetBoard.jsx
│   │   │   ├── MessageDisplay.jsx
│   │   │   ├── PhraseButtons.jsx
│   │   │   └── PredictionBox.jsx
│   │   └── index.css
│   └── index.html
├── DEPLOYMENT.md         # Cara deploy ke Railway + Vercel
├── README.md
└── package.json
```

---

## 📝 Kustomisasi

### Tambah Frasa Baru

Edit `backend/src/index.js`, cari `COMMON_PHRASES`:

```javascript
const COMMON_PHRASES = [
  { id: 'yes', text: 'Ya', category: 'respons' },
  { id: 'no', text: 'Tidak', category: 'respons' },
  // ... add your phrase here
  { id: 'custom', text: 'Pesan Anda', category: 'kategori' },
];
```

Lalu restart backend: `npm start`

### Ubah Ukuran Font

Edit `frontend/src/components/AlphabetBoard.jsx`:

```javascript
// Ubah ini untuk membuat tombol lebih besar:
className="h-20 md:h-24 lg:h-28"
// Menjadi:
className="h-24 md:h-32 lg:h-40"
```

Atau edit `frontend/tailwind.config.js` untuk custom font sizes.

### Ubah Warna

Edit `frontend/src/components/AlphabetBoard.jsx`:

```javascript
// Blue untuk alfabet:
className="bg-blue-500 hover:bg-blue-600"

// Green untuk angka:
className="bg-green-500 hover:bg-green-600"

// Purple untuk tanda baca:
className="bg-purple-500 hover:bg-purple-600"
```

---

## 🐛 Troubleshooting

### Port 5000 sudah terpakai
```bash
# Gunakan port lain:
PORT=5001 npm start
```

### CORS error saat fetch
Pastikan backend sedang jalan (cek di http://localhost:5000/api/health)

### Font tidak besar
- Gunakan Chrome/Firefox terbaru
- Zoom browser: Ctrl++ beberapa kali
- Edit CSS untuk tombol lebih besar

### Text-to-speech tidak jalan
- Hanya berfungsi di HTTPS (deployment) atau localhost (dev)
- Browser harus support Web Speech API (Chrome, Firefox, Edge)
- Pastikan speaker aktif

---

## 📚 Next Steps

1. **Test dengan keluarga:** Ajak orang tua coba di tablet/desktop
2. **Gather feedback:** Apa yang perlu diperbaiki?
3. **Deploy:** Ikuti DEPLOYMENT.md
4. **Iterate:** Update berdasarkan feedback

---

## 🆘 Bantuan

- **Backend error?** Cek `backend/src/index.js`
- **Frontend error?** Buka DevTools (F12), lihat Console
- **Deployment problem?** Baca DEPLOYMENT.md

---

**Happy coding! 🚀**
