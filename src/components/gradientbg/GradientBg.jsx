import React, { useEffect, useRef } from 'react'
import './GradientBg.css'

export default function GradientBg({ title = 'Bubbles', showText = false }) {
  const interactiveRef = useRef(null)
  const rafRef = useRef(0)
  const cur = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const el = interactiveRef.current
    if (!el) return

    const onMouseMove = (e) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }

    const move = () => {
      cur.current.x += (target.current.x - cur.current.x) / 20
      cur.current.y += (target.current.y - cur.current.y) / 20
      el.style.transform = `translate(${Math.round(
        cur.current.x
      )}px, ${Math.round(cur.current.y)}px)`
      rafRef.current = requestAnimationFrame(move)
    }

    window.addEventListener('mousemove', onMouseMove)
    move()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {showText && <div className='text-container'>{title}</div>}

      <div className='gradient-bg' aria-hidden='true'>
        <svg xmlns='http://www.w3.org/2000/svg'>
          <defs>
            <filter id='goo'>
              <feGaussianBlur
                in='SourceGraphic'
                stdDeviation='10'
                result='blur'
              />
              <feColorMatrix
                in='blur'
                mode='matrix'
                values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8'
                result='goo'
              />
              <feBlend in='SourceGraphic' in2='goo' />
            </filter>
          </defs>
        </svg>

        <div className='gradients-container'>
          <div className='g1' />
          <div className='g2' />
          <div className='g3' />
          <div className='g4' />
          <div className='g5' />
          <div className='interactive' ref={interactiveRef} />
        </div>
      </div>
    </>
  )
}
