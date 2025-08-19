import { Link } from 'react-router-dom'
import React from 'react'
import './Layout.css'
import GradientBg from '../gradientbg/GradientBg'

export default function Layout({ children }) {
  return (
    <div className='layout'>
      <GradientBg />
      <header className='layout-header'>
        <Link to='/' className='layout-logo'>
          React Games
        </Link>
        <nav className='layout-nav'>
          <Link to='/tic-tac-toe'>Tres en raya</Link>
          <Link to='/memory'>Memoria</Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  )
}
