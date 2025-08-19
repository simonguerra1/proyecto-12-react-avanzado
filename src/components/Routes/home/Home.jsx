import React from 'react'
import GameCard from '../../gamecard/GameCard.jsx'
import './Home.css'

export default function Home() {
  return (
    <section className='home'>
      <GameCard to='/tic-tac-toe' title='Tres en raya' emoji='❌⭕️' />
      <GameCard to='/memory' title='Memoria' emoji='🧠🤔' />
    </section>
  )
}
