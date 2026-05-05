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

// Flat word list — predictions are filtered by prefix of the word being typed
const ALL_WORDS = [
  // A
  'ada', 'adalah', 'agak', 'air', 'aku', 'aman', 'ambil', 'anak', 'angin', 'apa', 'apakah', 'atas', 'atau', 'ayah', 'ayo',
  // B
  'badan', 'baik', 'bantu', 'banyak', 'bawah', 'benar', 'berbaring', 'beri', 'bersih', 'besar', 'bisa', 'beli', 'belum', 'boleh', 'bosan', 'buka', 'butuh',
  // C
  'capek', 'cara', 'cari', 'cepat', 'coba', 'cukup',
  // D
  'dada', 'dalam', 'dan', 'dapat', 'dari', 'datang', 'dekat', 'demam', 'dengan', 'dia', 'dingin', 'dokter', 'duduk',
  // E
  'enam', 'enak', 'empat', 'engkau',
  // F
  'fisik', 'foto',
  // G
  'ganti', 'gatal', 'gawat', 'gelas', 'gerak', 'gigi',
  // H
  'habis', 'halo', 'hangat', 'hanya', 'hari', 'haus', 'hati', 'hubungi',
  // I
  'ingat', 'ingin', 'ini', 'istirahat', 'itu', 'iya',
  // J
  'jadi', 'jaga', 'jalan', 'jam', 'jauh', 'jatuh', 'juga',
  // K
  'kaki', 'kamar', 'kami', 'kamu', 'kanan', 'karena', 'keluar', 'kenapa', 'kepala', 'keras', 'kiri', 'kuat', 'kurang',
  // L
  'lagi', 'lama', 'lambat', 'lapar', 'lelah', 'lemah', 'luka', 'lutut',
  // M
  'maaf', 'makan', 'mama', 'mandi', 'masuk', 'malam', 'mau', 'minta', 'minum', 'mual', 'mulai', 'mulut',
  // N
  'nafas', 'nama', 'nanti', 'nasi', 'ngantuk', 'nyaman', 'nyeri',
  // O
  'obat', 'oke', 'orang',
  // P
  'panas', 'panggil', 'pegal', 'pelan', 'pergi', 'perlu', 'perawat', 'perut', 'pindah', 'pingsan', 'pucat', 'pulang', 'punggung', 'pusing',
  // R
  'rasa', 'rawat', 'ringan', 'rumah',
  // S
  'sakit', 'sampai', 'sangat', 'saya', 'sedih', 'sebentar', 'sekali', 'selesai', 'semua', 'senang', 'sesak', 'siapa', 'sudah', 'susah',
  // T
  'takut', 'tambah', 'tangan', 'tengah', 'terlalu', 'terima', 'terus', 'tidak', 'tidur', 'tolong', 'tunggu',
  // U
  'udara', 'ulangi', 'untuk',
  // W
  'wajah', 'waktu',
  // Y
  'ya', 'yang', 'yen',
].sort();

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

// 3. GET prediksi kata berdasarkan awalan kata yang sedang diketik
app.get('/api/predict/:prefix', (req, res) => {
  const prefix = req.params.prefix.toLowerCase();
  const predictions = ALL_WORDS.filter(w => w.startsWith(prefix));
  res.json({ prefix, predictions: predictions.slice(0, 4) });
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
