import React from 'react'

function MessageDisplay({ message, onSend, onBackspace, onClear, onSpeak, isSpeaking }) {
  return (
    <div className="space-y-4">
      {/* Display Pesan */}
      <div className="bg-gradient-to-b from-blue-50 to-white border-4 border-blue-300 rounded-lg p-6 min-h-32 md:min-h-40">
        <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight break-words">
          {message || <span className="text-gray-400">Mulai ketik pesan Anda...</span>}
        </p>
      </div>

      {/* Tombol Kontrol */}
      <div className="grid grid-cols-2 gap-3">
        {/* Backspace */}
        <button
          onClick={onBackspace}
          className="h-16 md:h-20 bg-red-500 hover:bg-red-600 text-white font-bold text-2xl md:text-3xl rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          ← Hapus
        </button>

        {/* Clear */}
        <button
          onClick={onClear}
          className="h-16 md:h-20 bg-orange-500 hover:bg-orange-600 text-white font-bold text-2xl md:text-3xl rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          ✕ Bersih
        </button>
      </div>

      {/* Speak & Send */}
      <div className="grid grid-cols-2 gap-3">
        {/* Speak */}
        <button
          onClick={() => onSpeak(message)}
          disabled={!message.trim() || isSpeaking}
          className="h-16 md:h-20 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white font-bold text-2xl md:text-3xl rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          🔊 {isSpeaking ? 'Bicara...' : 'Dengar'}
        </button>

        {/* Send */}
        <button
          onClick={onSend}
          disabled={!message.trim()}
          className="h-16 md:h-20 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold text-2xl md:text-3xl rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          ✓ Kirim
        </button>
      </div>

      {/* Info */}
      <p className="text-lg md:text-xl text-gray-600 text-center">
        {message.length} karakter
      </p>
    </div>
  )
}

export default MessageDisplay
