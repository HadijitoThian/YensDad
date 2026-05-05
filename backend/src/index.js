import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Setup
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files
const frontendPath = join(__dirname, '../../frontend/dist');
app.use(express.static(frontendPath));

// ===== DATA =====

// Alfabet dan angka
const ALPHABET = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  lowercase: 'abcdefghijklmnopqrstuvwxyz'.split(''),
  numbers: '0123456789'.split(''),
  symbols: [' ', '.', ',', '!', '?', ':', ';', '-', '(', ')']
};

// Kamus kata Bahasa Indonesia untuk prediksi – kata-kata yang umum dipakai sehari-hari
const INDONESIAN_WORDS = {
  'a': ['air', 'aku', 'ada', 'apa', 'akan', 'ambil', 'aman', 'anak', 'ayah', 'angin'],
  'b': ['baik', 'bantu', 'bisa', 'belum', 'butuh', 'banyak', 'boleh', 'benar', 'badan', 'beli'],
  'c': ['coba', 'cepat', 'cukup', 'capek', 'cara', 'cari', 'cerita', 'cuaca'],
  'd': ['dan', 'dari', 'dengan', 'dekat', 'dokter', 'duduk', 'demam', 'dingin', 'dapat', 'dia'],
  'e': ['enak', 'enam', 'empat', 'engkau'],
  'f': ['foto', 'fisik', 'fungsi'],
  'g': ['gatal', 'gigi', 'gerak', 'gelas', 'gawat', 'gantung'],
  'h': ['halo', 'hari', 'hangat', 'hanya', 'habis', 'hati', 'hubungi'],
  'i': ['ini', 'ingin', 'ingat', 'itu', 'istirahat', 'iya'],
  'j': ['juga', 'jalan', 'jaga', 'jatuh', 'jam', 'jauh', 'jadi'],
  'k': ['kamu', 'kamar', 'kaki', 'kepala', 'kanan', 'kiri', 'kurang', 'kuat', 'kami', 'keras'],
  'l': ['lagi', 'lelah', 'lapar', 'lama', 'lambat', 'lemah', 'lanjut'],
  'm': ['mau', 'makan', 'minum', 'minta', 'maaf', 'mama', 'malam', 'mual', 'mulut', 'mulai'],
  'n': ['nasi', 'nyeri', 'ngantuk', 'nama', 'nafas', 'nyaman'],
  'o': ['obat', 'oke', 'orang'],
  'p': ['pelan', 'perlu', 'panas', 'pusing', 'panggil', 'perawat', 'pulang', 'perut', 'pindah'],
  'q': [],
  'r': ['rasa', 'rumah', 'ringan', 'rusak', 'raba'],
  's': ['sakit', 'saya', 'sudah', 'siapa', 'selesai', 'senang', 'sedih', 'sesak', 'semua', 'sampai'],
  't': ['terima', 'tolong', 'tidak', 'tidur', 'tangan', 'tunggu', 'takut', 'terus'],
  'u': ['untuk', 'udara', 'usus', 'ulangi'],
  'v': [],
  'w': ['waktu', 'wajah'],
  'x': [],
  'y': ['ya', 'yang', 'yen'],
  'z': ['zona'],
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

// ===== SERVE FRONTEND INDEX FOR SPA ROUTING =====

// All other routes serve the frontend index.html for React routing
app.get('*', (req, res) => {
  // If it's not an API route, serve the frontend
  if (!req.path.startsWith('/api')) {
    res.sendFile(join(frontendPath, 'index.html'));
  }
});

// ===== START SERVER =====

app.listen(PORT, () => {
  console.log(`✅ Yens Dad App berjalan di http://localhost:${PORT}`);
  console.log(`📡 Frontend: http://localhost:${PORT}`);
  console.log(`🔗 API: http://localhost:${PORT}/api/health`);
  console.log(`🔧 Static files served from: ${frontendPath}`);
});
