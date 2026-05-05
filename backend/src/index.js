import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Setup
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ===== DATA =====

// Alfabet dan angka
const ALPHABET = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  lowercase: 'abcdefghijklmnopqrstuvwxyz'.split(''),
  numbers: '0123456789'.split(''),
  symbols: [' ', '.', ',', '!', '?', ':', ';', '-', '(', ')']
};

// Kamus kata Bahasa Indonesia untuk prediksi
const INDONESIAN_WORDS = {
  'a': ['aku', 'ada', 'akan', 'ampas', 'ambil', 'aman', 'adalah', 'air', 'apa', 'apakah'],
  'b': ['baik', 'banyak', 'baru', 'balas', 'baca', 'bahkan', 'basah', 'belum', 'belakang', 'beli'],
  'c': ['coba', 'cinta', 'cepat', 'cuaca', 'cukup', 'cabang', 'calon', 'cara', 'cari', 'cerita'],
  'd': ['dan', 'dapat', 'dari', 'dasar', 'datang', 'daya', 'dengan', 'dekat', 'demam', 'dia'],
  'e': ['emas', 'empat', 'enak', 'energi', 'engkau'],
  'f': ['foto', 'fungsi'],
  'g': ['gaji', 'gampang', 'ganda', 'ganteng', 'gantung', 'garam', 'garis', 'garis', 'gatal', 'gaya'],
  'h': ['halo', 'halus', 'hama', 'hampir', 'handal', 'hangat', 'hanya', 'hapus', 'hari', 'harpa', 'hasil', 'hatan', 'hati', 'hati', 'hawa'],
  'i': ['ikan', 'iman', 'imajinasi', 'imajinasi', 'impian', 'incar', 'indah', 'ingat', 'ingin', 'ini', 'injak'],
  'j': ['jadi', 'jadwal', 'jago', 'jagung', 'jahat', 'jajahan', 'jajar', 'jalan', 'jalar', 'jamba', 'jambi', 'jambul', 'jamiah', 'jamuan', 'jamuran', 'janggal', 'janggut', 'janji', 'jangka', 'jangkau'],
  'k': ['kaca', 'kacau', 'kacer', 'kacip', 'kada', 'kadal', 'kadaluarsa', 'kadang', 'kadanya', 'kadarnya', 'kadek', 'kademenan', 'kademian', 'kadepak', 'kadera', 'kadera', 'kadesakan', 'kadesa', 'kadeton', 'kadét'],
  'l': ['laban', 'label', 'laberi', 'labial', 'labil', 'labor', 'laborat', 'labur', 'labut', 'labyo', 'laca', 'lacak', 'lacala', 'lacap', 'lacar', 'lacari'],
  'm': ['maaf', 'maag', 'maal', 'maalish', 'maan', 'maar', 'maat', 'maatregels', 'mabad', 'mabadi', 'mabain', 'mabaloi', 'maban'],
  'n': ['nabil', 'nabel', 'nabi', 'nabilah', 'nabilan', 'nabir', 'nabo', 'nabor', 'nabu', 'nabung'],
  'o': ['oad', 'oak', 'oaks', 'oal', 'oalike', 'oasis', 'oast', 'oat'],
  'p': ['pabila', 'pabil', 'pabna', 'pabrikasi', 'pabrik', 'pabrik', 'pabrik', 'pabrik', 'paca', 'pacak'],
  't': ['taba', 'tabad', 'tabah', 'taban', 'tabar', 'tabari', 'tabat', 'tabau', 'tabel', 'tabelbulbul'],
  'w': ['wab', 'waba', 'wabad', 'wabah', 'wabak', 'waban', 'wabar', 'wabari'],
  'y': ['yabancı', 'yabancılık', 'yabanı', 'yaban', 'yabbas', 'yabe', 'yabenin', 'yabina'],
  'z': ['zabel', 'zabet', 'zabeta', 'zabid', 'zabidah', 'zabihan', 'zabihh', 'zabih', 'zabihh']
};

// Frasa umum (sering digunakan oleh pasien stroke)
const COMMON_PHRASES = [
  { id: 'yes', text: 'Ya', category: 'respons' },
  { id: 'no', text: 'Tidak', category: 'respons' },
  { id: 'ok', text: 'Baik', category: 'respons' },
  { id: 'water', text: 'Saya ingin minum', category: 'kebutuhan' },
  { id: 'bathroom', text: 'Saya perlu ke kamar mandi', category: 'kebutuhan' },
  { id: 'pain', text: 'Saya sakit', category: 'kesehatan' },
  { id: 'tired', text: 'Saya lelah', category: 'perasaan' },
  { id: 'help', text: 'Saya butuh bantuan', category: 'kebutuhan' },
  { id: 'thank', text: 'Terima kasih', category: 'sopan' },
  { id: 'sorry', text: 'Maaf', category: 'sopan' },
  { id: 'hello', text: 'Halo', category: 'sapaan' },
  { id: 'i_love_you', text: 'Saya sayang kamu', category: 'emosi' },
  { id: 'call_doctor', text: 'Panggil dokter', category: 'darurat' },
  { id: 'hungry', text: 'Saya lapar', category: 'kebutuhan' },
  { id: 'medicine', text: 'Saya butuh obat', category: 'kesehatan' }
];

// ===== API ROUTES =====

// 1. GET alfabet
app.get('/api/alphabet', (req, res) => {
  res.json(ALPHABET);
});

// 2. GET frasa umum
app.get('/api/phrases', (req, res) => {
  res.json(COMMON_PHRASES);
});

// 3. GET prediksi kata berdasarkan huruf awal
app.get('/api/predict/:letter', (req, res) => {
  const letter = req.params.letter.toLowerCase();
  const predictions = INDONESIAN_WORDS[letter] || [];
  res.json({
    letter,
    predictions: predictions.slice(0, 6) // Top 6 predictions
  });
});

// 4. POST test text-to-speech (hanya return metadata, client-side TTS)
app.post('/api/speak', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text diperlukan' });
  }
  res.json({
    status: 'ok',
    message: 'Text siap dibaca. Client akan menggunakan Web Speech API.'
  });
});

// 5. GET health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend berjalan dengan baik' });
});

// ===== START SERVER =====

app.listen(PORT, () => {
  console.log(`✅ Yens Dad Backend berjalan di http://localhost:${PORT}`);
  console.log(`📡 API ready untuk frontend`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});
