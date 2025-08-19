import React, { useCallback } from 'react'
import Square from '../square/Square.jsx'
import './Board.css'

export default function Board({ board, onPlay, winner }) {
  const handle = useCallback((i) => () => onPlay(i), [onPlay])

  return (
    <div className='ttt-board'>
      {board.map((v, i) => (
        <Square
          key={i}
          value={v}
          onClick={handle(i)}
          disabled={!!v || !!winner}
        />
      ))}
    </div>
  )
}
