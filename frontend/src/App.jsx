import React, { useState, useEffect } from 'react'
import AlphabetBoard from './components/AlphabetBoard'
import MessageDisplay from './components/MessageDisplay'
import PhraseButtons from './components/PhraseButtons'
import PredictionBox from './components/PredictionBox'

function App() {
  const [message, setMessage] = useState('')
  const [history, setHistory] = useState([])
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [predictions, setPredictions] = useState([])
  const [lastLetter, setLastLetter] = useState('')

  // Use relative URLs so it works both locally and on Railway
  const API_URL = import.meta.env.VITE_API_URL || ''

  // Handle alfabet click
  const handleLetterClick = (letter) => {
    setMessage(prev => prev + letter)
    fetchPredictions(letter)
  }

  // Fetch predictions saat huruf baru ditambah
  const fetchPredictions = async (letter) => {
    try {
      const response = await fetch(`${API_URL}/api/predict/${letter}`)
      const data = await response.json()
      setPredictions(data.predictions || [])
      setLastLetter(letter)
    } catch (error) {
      console.error('Error fetching predictions:', error)
    }
  }

  // Handle prediction click
  const handlePredictionClick = (word) => {
    setMessage(prev => {
      // Hapus huruf terakhir dan ganti dengan kata lengkap
      const base = prev.slice(0, -1)
      return base + word + ' '
    })
    setPredictions([])
    // Auto-speak after small delay to let state update
    setTimeout(() => speak(word + ' '), 50)
  }

  // Handle phrase click
  const handlePhraseClick = (phraseText) => {
    setMessage(phraseText)
  }

  // Text to speech
  const speak = (text) => {
    if (!text.trim()) return

    setIsSpeaking(true)
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'id-ID'
    utterance.rate = 0.8
    utterance.pitch = 1
    utterance.volume = 1

    utterance.onend = () => setIsSpeaking(false)
    window.speechSynthesis.speak(utterance)
  }

  // Clear message
  const clearMessage = () => {
    setMessage('')
    setPredictions([])
  }

  // Backspace
  const handleBackspace = () => {
    setMessage(prev => prev.slice(0, -1))
    setPredictions([])
  }

  // Send message (save to history)
  const handleSendMessage = () => {
    if (message.trim()) {
      setHistory(prev => [...prev, { text: message, timestamp: new Date().toLocaleTimeString('id-ID') }])
      speak(message)
      clearMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-1">💬 Aplikasi Komunikasi</h1>
          <p className="text-xl md:text-2xl text-blue-700">Untuk Ayah Yens</p>
        </div>

        {/* Main Layout: Keyboard + Predictions + Phrases */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          {/* Left: Alphabet Board */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 h-full">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Papan Alfabet</h2>
              <AlphabetBoard onLetterClick={handleLetterClick} />
            </div>
          </div>

          {/* Middle: Recommendations + Message */}
          <div className="lg:col-span-2">
            {/* Current Message */}
            <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
              <h3 className="text-2xl font-bold text-blue-900 mb-2">Pesan Saat Ini</h3>
              <div className="bg-blue-50 border-3 border-blue-300 rounded-lg p-4 min-h-24 flex items-center">
                <p className="text-3xl font-bold text-blue-900 break-words">{message || '...'}</p>
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={handleBackspace} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg text-2xl">⌫ Hapus Huruf</button>
                <button onClick={clearMessage} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg text-2xl">🗑️ Bersihkan</button>
                <button onClick={() => speak(message)} disabled={!message.trim() || isSpeaking} className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg text-2xl">🔊 Baca</button>
              </div>
            </div>

            {/* Predicted Words - Show immediately next to keyboard */}
            {predictions.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
                <h3 className="text-2xl font-bold text-blue-900 mb-3">Saran Kata</h3>
                <div className="grid grid-cols-2 gap-2">
                  {predictions.slice(0, 6).map((word, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        handlePredictionClick(word)
                        setTimeout(() => speak(word + ' '), 100)
                      }}
                      className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-bold py-4 px-3 rounded-lg text-2xl transition-all"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Phrases */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-2xl font-bold text-blue-900 mb-3">Frasa Cepat</h3>
              <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                <button onClick={() => { handlePhraseClick('Apa kabar?'); setTimeout(() => speak('Apa kabar?'), 100); }} className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg text-xl text-left">Apa kabar?</button>
                <button onClick={() => { handlePhraseClick('Terima kasih'); setTimeout(() => speak('Terima kasih'), 100); }} className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg text-xl text-left">Terima kasih</button>
                <button onClick={() => { handlePhraseClick('Tidak'); setTimeout(() => speak('Tidak'), 100); }} className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg text-xl text-left">Tidak</button>
                <button onClick={() => { handlePhraseClick('Ya'); setTimeout(() => speak('Ya'), 100); }} className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg text-xl text-left">Ya</button>
              </div>
            </div>
          </div>
        </div>

        {/* History - Below everything */}
        {history.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-3xl font-bold text-blue-900 mb-4">📋 Riwayat Pesan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {history.slice(-4).map((item, idx) => (
                <div key={idx} className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                  <p className="text-2xl font-semibold text-blue-900 mb-2">{item.text}</p>
                  <p className="text-lg text-blue-600">{item.timestamp}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
