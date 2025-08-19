import { Link } from 'react-router-dom'
import './GameCard.css'

export default function GameCard({ to, title, emoji }) {
  return (
    <Link to={to} aria-label={title} className='game-card'>
      <span className='game-card-emoji'>{emoji}</span>
      <span className='game-card-title'>{title}</span>
    </Link>
  )
}
