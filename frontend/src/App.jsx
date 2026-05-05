import React, { useState, useEffect, useRef } from 'react'
import AlphabetBoard from './components/AlphabetBoard'

// ─── Daily words organised by activity tab ───────────────────────────────────
const DAILY_WORDS = {
  sapaan: {
    label: 'Sapaan',
    emoji: '👋',
    btnColor: 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700',
    words: [
      'Halo', 'Selamat pagi', 'Selamat siang', 'Selamat malam',
      'Apa kabar?', 'Saya baik-baik saja', 'Terima kasih', 'Sama-sama',
      'Maaf', 'Tidak apa-apa', 'Sampai jumpa', 'Senang bertemu kamu',
    ],
  },
  kebutuhan: {
    label: 'Kebutuhan',
    emoji: '🍽️',
    btnColor: 'bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700',
    words: [
      'Saya mau minum', 'Saya mau makan', 'Saya lapar', 'Saya haus',
      'Saya mau ke kamar mandi', 'Saya mau obat', 'Saya butuh bantuan',
      'Tolong panggilkan Yen', 'Saya mau tidur', 'Saya mau istirahat',
      'Tolong angkat saya', 'Saya mau duduk', 'Saya mau berbaring',
      'Tolong ganti posisi', 'Saya kedinginan', 'Saya kepanasan',
    ],
  },
  perasaan: {
    label: 'Perasaan',
    emoji: '❤️',
    btnColor: 'bg-pink-500 hover:bg-pink-600 active:bg-pink-700',
    words: [
      'Saya senang', 'Saya sedih', 'Saya lelah', 'Saya bosan',
      'Saya kesepian', 'Saya takut', 'Saya frustrasi', 'Saya nyaman',
      'Saya tidak nyaman', 'Saya sayang kamu', 'Saya rindu kamu',
      'Saya baik-baik saja', 'Saya tidak apa-apa', 'Saya khawatir',
    ],
  },
  kesehatan: {
    label: 'Kesehatan',
    emoji: '💊',
    btnColor: 'bg-orange-500 hover:bg-orange-600 active:bg-orange-700',
    words: [
      'Kepala saya sakit', 'Perut saya sakit', 'Kaki saya sakit',
      'Tangan saya sakit', 'Dada saya sakit', 'Punggung saya sakit',
      'Saya pusing', 'Saya mual', 'Susah bernapas',
      'Saya demam', 'Terasa gatal', 'Terasa kebas',
      'Sudah minum obat', 'Belum minum obat', 'Saya perlu dokter',
    ],
  },
  darurat: {
    label: 'Darurat',
    emoji: '🆘',
    btnColor: 'bg-red-600 hover:bg-red-700 active:bg-red-800',
    words: [
      'TOLONG!', 'Panggil dokter', 'Panggil perawat',
      'Saya jatuh', 'Susah bernapas', 'Hubungi Yen sekarang',
    ],
  },
}

// ─────────────────────────────────────────────────────────────────────────────

function App() {
  const [message, setMessage]     = useState('')
  const [history, setHistory]     = useState(() => {
    try { return JSON.parse(localStorage.getItem('msgHistory') || '[]') } catch { return [] }
  })
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [predictions, setPredictions] = useState([])
  const [activeTab, setActiveTab] = useState('sapaan')

  const API_URL   = import.meta.env.VITE_API_URL || ''
  const idVoiceRef = useRef(null)

  // ── Load Indonesian voice (browsers load voices asynchronously) ────────────
  useEffect(() => {
    const pick = () => {
      const vs = window.speechSynthesis.getVoices()
      idVoiceRef.current =
        vs.find(v => v.lang === 'id-ID') ||
        vs.find(v => v.lang.startsWith('id')) ||
        null
    }
    pick()
    window.speechSynthesis.addEventListener('voiceschanged', pick)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', pick)
  }, [])

  // ── Speech ─────────────────────────────────────────────────────────────────
  const speak = (text) => {
    if (!text?.trim()) return
    window.speechSynthesis.cancel()
    setIsSpeaking(true)
    const u = new SpeechSynthesisUtterance(text)
    if (idVoiceRef.current) u.voice = idVoiceRef.current
    u.lang   = 'id-ID'
    u.rate   = 0.85
    u.pitch  = 1
    u.volume = 1
    u.onend  = () => setIsSpeaking(false)
    u.onerror = () => setIsSpeaking(false)
    window.speechSynthesis.speak(u)
  }

  // ── Keyboard ───────────────────────────────────────────────────────────────
  const handleLetterClick = (letter) => {
    const newMsg = message + letter
    setMessage(newMsg)
    // Extract the word currently being typed (after the last space)
    const currentWord = newMsg.trimEnd().split(/\s+/).pop() || ''
    if (currentWord.length > 0 && /[a-zA-Z]/.test(currentWord)) {
      fetchPredictions(currentWord)
    } else {
      setPredictions([])
    }
  }

  const fetchPredictions = async (word) => {
    try {
      const res  = await fetch(`${API_URL}/api/predict/${encodeURIComponent(word.toLowerCase())}`)
      const data = await res.json()
      setPredictions(data.predictions || [])
    } catch {
      setPredictions([])
    }
  }

  // ── Prediction click: replace current partial word with full word ──────────
  const handlePredictionClick = (word) => {
    const parts = message.trimEnd().split(/\s+/)
    parts[parts.length - 1] = word
    setMessage(parts.join(' ') + ' ')
    setPredictions([])
    speak(word)
  }

  // ── Daily words ────────────────────────────────────────────────────────────
  const handleDailyWordClick = (word) => {
    speak(word)
    addToHistory(word)
  }

  // ── Message controls ───────────────────────────────────────────────────────
  const handleBackspace = () => {
    setMessage(prev => prev.slice(0, -1))
    setPredictions([])
  }

  const clearMessage = () => {
    setMessage('')
    setPredictions([])
  }

  const handleSend = () => {
    if (!message.trim()) return
    speak(message)
    addToHistory(message)
    clearMessage()
  }

  const addToHistory = (text) => {
    setHistory(prev => {
      const next = [...prev, { text, timestamp: new Date().toLocaleTimeString('id-ID') }].slice(-20)
      localStorage.setItem('msgHistory', JSON.stringify(next))
      return next
    })
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-2">
      <div className="max-w-screen-xl mx-auto space-y-2">

        {/* ── Header ── */}
        <div className="text-center py-1">
          <h1 className="text-xl md:text-2xl font-bold text-blue-900">
            💬 Aplikasi Komunikasi – Untuk Ayah Yens
          </h1>
        </div>

        {/* ── Message bar + controls ── */}
        <div className="bg-white rounded-xl shadow-lg p-2 md:p-3">
          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg px-3 py-2 min-h-[52px] flex items-center mb-2">
            {message
              ? <p className="text-2xl md:text-3xl font-bold text-blue-900 break-words w-full">{message}</p>
              : <p className="text-lg text-blue-300 font-medium">Ketik pesan atau pilih kata di bawah…</p>
            }
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            <button onClick={handleBackspace}
              className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold py-2 md:py-3 rounded-lg text-base md:text-xl">
              ⌫ Hapus
            </button>
            <button onClick={clearMessage}
              className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-2 md:py-3 rounded-lg text-base md:text-xl">
              🗑️ Bersih
            </button>
            <button onClick={() => speak(message)} disabled={!message.trim() || isSpeaking}
              className="bg-green-500 hover:bg-green-600 active:bg-green-700 disabled:bg-gray-300 text-white font-bold py-2 md:py-3 rounded-lg text-base md:text-xl">
              🔊 Baca
            </button>
            <button onClick={handleSend} disabled={!message.trim()}
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-300 text-white font-bold py-2 md:py-3 rounded-lg text-base md:text-xl">
              ✓ Kirim
            </button>
          </div>
        </div>

        {/* ── Main grid: keyboard LEFT | predictions + words RIGHT ──────────────
            md = 768 px+  → 2 columns side by side (tablet)
            below md      → single column (phone, stacked)
        ─────────────────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 items-start">

          {/* LEFT – Alphabet board (3 of 5 cols on tablet) */}
          <div className="md:col-span-3 bg-white rounded-xl shadow-lg p-2 md:p-3">
            <p className="text-base font-bold text-blue-700 mb-1.5">Papan Huruf</p>
            <AlphabetBoard onLetterClick={handleLetterClick} />
          </div>

          {/* RIGHT – Predictions + Daily words (2 of 5 cols on tablet) */}
          <div className="md:col-span-2 flex flex-col gap-2">

            {/* ── Suggested words – always visible, right next to keyboard ── */}
            <div className="bg-white rounded-xl shadow-lg p-2 md:p-3">
              <p className="text-base font-bold text-blue-700 mb-1.5">
                Saran Kata
                {predictions.length > 0 && (
                  <span className="ml-2 text-sm font-normal text-gray-400">
                    (ketik lebih banyak = lebih tepat)
                  </span>
                )}
              </p>
              {predictions.length > 0 ? (
                <div className="grid grid-cols-2 gap-1.5">
                  {predictions.slice(0, 4).map((word, i) => (
                    <button key={i} onClick={() => handlePredictionClick(word)}
                      className="bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700 text-white font-bold py-3 md:py-4 rounded-lg text-xl md:text-2xl transition-transform active:scale-95">
                      {word}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-400 text-sm py-2">
                  Ketik huruf → saran kata muncul di sini
                </p>
              )}
            </div>

            {/* ── Daily words soundboard – tabbed ── */}
            <div className="bg-white rounded-xl shadow-lg p-2 md:p-3">
              <p className="text-base font-bold text-blue-700 mb-1.5">Kata Sehari-hari</p>

              {/* Tabs */}
              <div className="flex flex-wrap gap-1 mb-2">
                {Object.entries(DAILY_WORDS).map(([key, cat]) => (
                  <button key={key} onClick={() => setActiveTab(key)}
                    className={`px-2 py-1 rounded-lg font-bold text-xs md:text-sm transition-all ${
                      activeTab === key
                        ? 'bg-blue-900 text-white shadow'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}>
                    {cat.emoji} {cat.label}
                  </button>
                ))}
              </div>

              {/* Word list – scrolls only inside this box */}
              <div className="flex flex-col gap-1.5 max-h-52 md:max-h-64 overflow-y-auto pr-0.5">
                {DAILY_WORDS[activeTab].words.map((word, i) => (
                  <button key={i} onClick={() => handleDailyWordClick(word)}
                    className={`${DAILY_WORDS[activeTab].btnColor} text-white font-bold py-2.5 px-3 rounded-lg text-base md:text-lg text-left transition-transform active:scale-95`}>
                    🔊 {word}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── Message history ── */}
        {history.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-2 md:p-3">
            <div className="flex justify-between items-center mb-2">
              <p className="text-base font-bold text-blue-900">📋 Riwayat Pesan</p>
              <button
                onClick={() => { setHistory([]); localStorage.removeItem('msgHistory') }}
                className="text-red-500 hover:text-red-700 font-semibold text-sm">
                Hapus Semua
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5">
              {history.slice(-8).reverse().map((item, i) => (
                <button key={i} onClick={() => speak(item.text)}
                  className="bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-lg p-2 text-left active:scale-95 transition-transform">
                  <p className="text-base font-semibold text-blue-900 break-words">{item.text}</p>
                  <p className="text-xs text-blue-400 mt-0.5">{item.timestamp}</p>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default App
