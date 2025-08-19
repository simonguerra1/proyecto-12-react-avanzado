import React from 'react'
import './Score.css'

function Score({ xWins, oWins, ties, next, winner }) {
  return (
    <div className='ttt-score'>
      <span>
        ❌ X: <strong>{xWins}</strong>
      </span>
      <span>
        ⭕ O: <strong>{oWins}</strong>
      </span>
      <span>
        🤝 Empates: <strong>{ties}</strong>
      </span>
      <span className='ttt-score-status'>
        {winner ? `Ganador: ${winner}` : `Turno: ${next}`}
      </span>
    </div>
  )
}

export default React.memo(Score)
