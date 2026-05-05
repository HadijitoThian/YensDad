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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-2">💬 Aplikasi Komunikasi</h1>
          <p className="text-2xl md:text-3xl text-blue-700">Untuk Ayah Yens</p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Alphabet Board */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Papan Alfabet</h2>
              <AlphabetBoard onLetterClick={handleLetterClick} />
            </div>

            {/* Predictions */}
            {predictions.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h3 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Saran Kata</h3>
                <PredictionBox predictions={predictions} onPredictionClick={handlePredictionClick} />
              </div>
            )}
          </div>

          {/* Right: Message & Phrases */}
          <div>
            {/* Message Display */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6 sticky top-4">
              <h3 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Pesan Anda</h3>
              <MessageDisplay message={message} onSend={handleSendMessage} onBackspace={handleBackspace} onClear={clearMessage} onSpeak={speak} isSpeaking={isSpeaking} />
            </div>

            {/* Common Phrases */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Frasa Cepat</h3>
              <PhraseButtons onPhraseClick={handlePhraseClick} />
            </div>
          </div>
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">📋 Riwayat Pesan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {history.map((item, idx) => (
                <div key={idx} className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                  <p className="text-2xl md:text-3xl font-semibold text-blue-900 mb-2">{item.text}</p>
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
