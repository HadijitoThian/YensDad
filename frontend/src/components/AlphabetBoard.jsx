import React, { useState, useEffect } from 'react'

function AlphabetBoard({ onLetterClick }) {
  const [alphabet, setAlphabet] = useState([])

  useEffect(() => {
    // Ambil alfabet dari API
    fetch('http://localhost:5000/api/alphabet')
      .then(res => res.json())
      .then(data => setAlphabet(data.uppercase))
      .catch(err => {
        console.error('Error:', err)
        // Fallback
        setAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))
      })
  }, [])

  return (
    <div className="space-y-6">
      {/* Alfabet Besar */}
      <div>
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-3">Huruf Besar</h3>
        <div className="grid grid-cols-6 md:grid-cols-8 gap-2 md:gap-3">
          {alphabet.map((letter) => (
            <button
              key={letter}
              onClick={() => onLetterClick(letter)}
              className="h-20 md:h-24 lg:h-28 bg-blue-500 hover:bg-blue-600 text-white font-bold text-4xl md:text-5xl lg:text-6xl rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Angka */}
      <div>
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-3">Angka</h3>
        <div className="grid grid-cols-6 md:grid-cols-10 gap-2 md:gap-3">
          {['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => onLetterClick(num)}
              className="h-20 md:h-24 lg:h-28 bg-green-500 hover:bg-green-600 text-white font-bold text-4xl md:text-5xl lg:text-6xl rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Simbol & Tanda Baca */}
      <div>
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-3">Tanda Baca & Simbol</h3>
        <div className="grid grid-cols-6 md:grid-cols-8 gap-2 md:gap-3">
          {[' ', '.', ',', '!', '?', ':', ';', '-', '(', ')'].map((symbol) => (
            <button
              key={symbol}
              onClick={() => onLetterClick(symbol)}
              className="h-20 md:h-24 lg:h-28 bg-purple-500 hover:bg-purple-600 text-white font-bold text-3xl md:text-4xl lg:text-5xl rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center"
            >
              {symbol === ' ' ? '␣' : symbol}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AlphabetBoard
