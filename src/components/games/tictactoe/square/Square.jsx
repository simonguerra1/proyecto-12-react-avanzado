import React from 'react'
import './Square.css'

function Square({ value, onClick, disabled }) {
  return (
    <button
      className='ttt-square'
      onClick={onClick}
      disabled={disabled}
      aria-label={`Square ${value ?? ''}`}
    >
      {value}
    </button>
  )
}

export default React.memo(Square)
