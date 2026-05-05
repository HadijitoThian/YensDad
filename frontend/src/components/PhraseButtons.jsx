import React, { useState, useEffect } from 'react'

function PhraseButtons({ onPhraseClick }) {
  const [phrases, setPhrases] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/phrases')
      .then(res => res.json())
      .then(data => setPhrases(data))
      .catch(err => console.error('Error:', err))
  }, [])

  // Group by category
  const groupedPhrases = phrases.reduce((acc, phrase) => {
    if (!acc[phrase.category]) {
      acc[phrase.category] = []
    }
    acc[phrase.category].push(phrase)
    return acc
  }, {})

  const categoryLabels = {
    'respons': '✓ Respons',
    'kebutuhan': '🍵 Kebutuhan',
    'kesehatan': '⚕️ Kesehatan',
    'perasaan': '❤️ Perasaan',
    'sopan': '🙏 Sopan',
    'sapaan': '👋 Sapaan',
    'emosi': '😊 Emosi',
    'darurat': '🚨 Darurat'
  }

  return (
    <div className="space-y-4">
      {Object.entries(groupedPhrases).map(([category, items]) => (
        <div key={category}>
          <h4 className="text-2xl md:text-3xl font-bold text-gray-700 mb-2">
            {categoryLabels[category] || category}
          </h4>
          <div className="space-y-2">
            {items.map((phrase) => (
              <button
                key={phrase.id}
                onClick={() => onPhraseClick(phrase.text)}
                className="w-full h-14 md:h-16 bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-2xl md:text-3xl rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                {phrase.text}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default PhraseButtons
