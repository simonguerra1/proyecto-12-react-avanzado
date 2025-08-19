import React from 'react'
import MemoryGame from '../../games/memory/MemoryGame/MemoryGame.jsx'

import './Memory.css'

export default function Memory() {
  return (
    <div className='memory-page'>
      <h2>Juego de Memoria</h2>
      <MemoryGame />
    </div>
  )
}
