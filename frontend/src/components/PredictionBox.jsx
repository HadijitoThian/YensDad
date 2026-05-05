import React from 'react'

function PredictionBox({ predictions, onPredictionClick }) {
  if (!predictions || predictions.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {predictions.map((word, idx) => (
        <button
          key={idx}
          onClick={() => onPredictionClick(word)}
          className="h-16 md:h-20 bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-2xl md:text-3xl lg:text-4xl rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center text-center px-2"
        >
          {word}
        </button>
      ))}
    </div>
  )
}

export default PredictionBox
