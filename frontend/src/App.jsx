import React, { useState } from 'react'
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
  const [message, setMessage] = useState('')
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem('msgHistory') || '[]') } catch { return [] }
  })
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [predictions, setPredictions] = useState([])
  const [activeTab, setActiveTab] = useState('sapaan')

  const API_URL = import.meta.env.VITE_API_URL || ''

  // ── Speech ─────────────────────────────────────────────────────────────────
  const speak = (text) => {
    if (!text || !text.trim()) return
    window.speechSynthesis.cancel()
    setIsSpeaking(true)
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'id-ID'
    u.rate = 0.8
    u.pitch = 1
    u.volume = 1
    u.onend = () => setIsSpeaking(false)
    u.onerror = () => setIsSpeaking(false)
    window.speechSynthesis.speak(u)
  }

  // ── Keyboard ───────────────────────────────────────────────────────────────
  const handleLetterClick = (letter) => {
    setMessage(prev => prev + letter)
    if (/[a-zA-Z]/.test(letter)) {
      fetchPredictions(letter)
    } else {
      setPredictions([])
    }
  }

  const fetchPredictions = async (letter) => {
    try {
      const res = await fetch(`${API_URL}/api/predict/${letter}`)
      const data = await res.json()
      setPredictions(data.predictions || [])
    } catch {
      setPredictions([])
    }
  }

  // ── Predictions ────────────────────────────────────────────────────────────
  const handlePredictionClick = (word) => {
    const newMsg = message.slice(0, -1) + word + ' '
    setMessage(newMsg)
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-2 md:p-4">
      <div className="max-w-screen-xl mx-auto space-y-3">

        {/* ── Header ── */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900">
            💬 Aplikasi Komunikasi – Untuk Ayah Yens
          </h1>
        </div>

        {/* ── Message bar + controls ── */}
        <div className="bg-white rounded-xl shadow-lg p-3">
          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg px-4 py-3 min-h-[72px] flex items-center mb-3">
            {message
              ? <p className="text-3xl md:text-4xl font-bold text-blue-900 break-words w-full">{message}</p>
              : <p className="text-2xl text-blue-300 font-medium">Ketik pesan atau pilih kata di bawah…</p>
            }
          </div>
          <div className="grid grid-cols-4 gap-2">
            <button onClick={handleBackspace}
              className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold py-3 rounded-lg text-lg md:text-2xl">
              ⌫ Hapus
            </button>
            <button onClick={clearMessage}
              className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-3 rounded-lg text-lg md:text-2xl">
              🗑️ Bersih
            </button>
            <button onClick={() => speak(message)} disabled={!message.trim() || isSpeaking}
              className="bg-green-500 hover:bg-green-600 active:bg-green-700 disabled:bg-gray-300 text-white font-bold py-3 rounded-lg text-lg md:text-2xl">
              🔊 Baca
            </button>
            <button onClick={handleSend} disabled={!message.trim()}
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-300 text-white font-bold py-3 rounded-lg text-lg md:text-2xl">
              ✓ Kirim
            </button>
          </div>
        </div>

        {/* ── Main 2-column: keyboard left | predictions + daily words right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 items-start">

          {/* LEFT – Alphabet board */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-lg p-4">
            <h2 className="text-2xl font-bold text-blue-900 mb-3">Papan Huruf</h2>
            <AlphabetBoard onLetterClick={handleLetterClick} />
          </div>

          {/* RIGHT – Predictions + Daily words */}
          <div className="lg:col-span-2 flex flex-col gap-3">

            {/* Predictions – always shown next to keyboard */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Saran Kata</h3>
              {predictions.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {predictions.slice(0, 4).map((word, i) => (
                    <button key={i} onClick={() => handlePredictionClick(word)}
                      className="bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700 text-white font-bold py-4 rounded-lg text-2xl md:text-3xl transition-transform active:scale-95">
                      {word}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-400 text-lg py-2">
                  Ketik huruf untuk saran kata
                </p>
              )}
            </div>

            {/* Daily words – tabbed soundboard */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Kata Sehari-hari</h3>

              {/* Tab bar */}
              <div className="flex flex-wrap gap-1 mb-3">
                {Object.entries(DAILY_WORDS).map(([key, cat]) => (
                  <button key={key} onClick={() => setActiveTab(key)}
                    className={`px-3 py-1.5 rounded-lg font-bold text-sm transition-all ${
                      activeTab === key
                        ? 'bg-blue-900 text-white shadow-md'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}>
                    {cat.emoji} {cat.label}
                  </button>
                ))}
              </div>

              {/* Words grid – scrollable inside panel only */}
              <div className="grid grid-cols-1 gap-2 max-h-72 lg:max-h-96 overflow-y-auto pr-1">
                {DAILY_WORDS[activeTab].words.map((word, i) => (
                  <button key={i} onClick={() => handleDailyWordClick(word)}
                    className={`${DAILY_WORDS[activeTab].btnColor} text-white font-bold py-3 px-4 rounded-lg text-xl md:text-2xl text-left transition-transform active:scale-95`}>
                    🔊 {word}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── Message history ── */}
        {history.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-2xl font-bold text-blue-900">📋 Riwayat Pesan</h3>
              <button
                onClick={() => { setHistory([]); localStorage.removeItem('msgHistory') }}
                className="text-red-500 hover:text-red-700 font-semibold text-lg">
                Hapus Semua
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {history.slice(-8).reverse().map((item, i) => (
                <button key={i} onClick={() => speak(item.text)}
                  className="bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-lg p-3 text-left active:scale-95 transition-transform">
                  <p className="text-xl font-semibold text-blue-900 break-words">{item.text}</p>
                  <p className="text-sm text-blue-400 mt-1">{item.timestamp}</p>
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
