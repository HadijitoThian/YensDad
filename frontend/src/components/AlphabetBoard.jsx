import React, { useState, useEffect } from 'react'

function AlphabetBoard({ onLetterClick }) {
  const [alphabet, setAlphabet] = useState([])
  const API_URL = import.meta.env.VITE_API_URL || ''

  useEffect(() => {
    fetch(`${API_URL}/api/alphabet`)
      .then(res => res.json())
      .then(data => setAlphabet(data.uppercase))
      .catch(() => setAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')))
  }, [])

  const btn = (extra) =>
    `font-bold rounded-lg shadow transition-transform active:scale-95 flex items-center justify-center ${extra}`

  return (
    <div className="space-y-4">

      {/* A – Z */}
      <div className="grid grid-cols-6 md:grid-cols-9 gap-2">
        {alphabet.map(letter => (
          <button key={letter} onClick={() => onLetterClick(letter)}
            className={btn('h-16 md:h-20 bg-blue-500 hover:bg-blue-600 text-white text-3xl md:text-4xl')}>
            {letter}
          </button>
        ))}
      </div>

      {/* 0 – 9 */}
      <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
        {['0','1','2','3','4','5','6','7','8','9'].map(n => (
          <button key={n} onClick={() => onLetterClick(n)}
            className={btn('h-16 md:h-20 bg-green-500 hover:bg-green-600 text-white text-3xl md:text-4xl')}>
            {n}
          </button>
        ))}
      </div>

      {/* Symbols */}
      <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
        {[' ', '.', ',', '!', '?', ':', ';', '-', '(', ')'].map(sym => (
          <button key={sym} onClick={() => onLetterClick(sym)}
            className={btn('h-16 md:h-20 bg-purple-500 hover:bg-purple-600 text-white text-2xl md:text-3xl')}>
            {sym === ' ' ? '␣' : sym}
          </button>
        ))}
      </div>

    </div>
  )
}

export default AlphabetBoard
