import React, { useEffect, useMemo, useRef, useState } from 'react'
import Card from '../Card/Card'
import './MemoryGame.css'

const ICONS = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍓', '🥝', '🍍'] // 8 pares = 16 cartas

function shuffle(array) {
  const a = array.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function MemoryGame() {
  // estado de juego
  const [deck, setDeck] = useState([]) // cartas mezcladas
  const [flipped, setFlipped] = useState([]) // índices volteados (máx 2)
  const [matched, setMatched] = useState(new Set()) // índices emparejados
  const [moves, setMoves] = useState(0)
  const [status, setStatus] = useState('idle') // 'idle' | 'playing' | 'won'

  // timer
  const [timeMs, setTimeMs] = useState(0)
  const startedAtRef = useRef(null)
  const intervalRef = useRef(null)

  // ranking (Top 5 de la sesión actual)
  const [rankings, setRankings] = useState([]) // [{timeMs:number, date:number}]

  // construir mazo inicial
  const baseDeck = useMemo(() => {
    const cards = [...ICONS, ...ICONS].map((v, i) => ({ id: i, value: v }))
    return shuffle(cards)
  }, [])

  useEffect(() => {
    setDeck(baseDeck)
  }, [baseDeck])

  // arranca timer en la primera jugada
  const ensureTimerStarted = () => {
    if (status === 'idle') {
      setStatus('playing')
      startedAtRef.current = performance.now()
      intervalRef.current = setInterval(() => {
        setTimeMs(performance.now() - startedAtRef.current)
      }, 100)
    }
  }

  // parar timer
  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  // lógica de flip
  const handleFlip = (index) => {
    if (status === 'won') return
    if (flipped.includes(index) || matched.has(index)) return
    if (flipped.length === 2) return

    ensureTimerStarted()
    const next = [...flipped, index]
    setFlipped(next)

    if (next.length === 2) {
      const [a, b] = next
      const isMatch = deck[a].value === deck[b].value
      // contamos el movimiento cuando se revelan dos
      setMoves((m) => m + 1)

      if (isMatch) {
        // marcar pareja
        const newMatched = new Set(matched)
        newMatched.add(a)
        newMatched.add(b)
        setMatched(newMatched)
        setFlipped([])

        // ¿ganó?
        const done = newMatched.size === deck.length
        if (done) {
          stopTimer()
          setStatus('won')
          // guardar en ranking (Top 5)
          setRankings((prev) => {
            const entry = {
              timeMs: performance.now() - startedAtRef.current,
              date: Date.now()
            }
            const sorted = [...prev, entry]
              .sort((x, y) => x.timeMs - y.timeMs)
              .slice(0, 5)
            return sorted
          })
        }
      } else {
        // voltear de vuelta
        setTimeout(() => setFlipped([]), 700)
      }
    }
  }

  // restart: reinicia juego y tiempo, conserva ranking
  const restart = () => {
    stopTimer()
    setDeck(shuffle(deck))
    setFlipped([])
    setMatched(new Set())
    setMoves(0)
    setTimeMs(0)
    startedAtRef.current = null
    setStatus('idle')
  }

  // limpiar interval al desmontar
  useEffect(() => () => stopTimer(), [])

  // helpers UI
  const formatMs = (ms) => {
    const s = Math.floor(ms / 1000)
    const m = Math.floor(s / 60)
    const sec = s % 60
    const cs = Math.floor((ms % 1000) / 10) // centésimas
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(
      2,
      '0'
    )}.${String(cs).padStart(2, '0')}`
  }

  return (
    <div className='memory-wrap'>
      <div className='memory-hud'>
        <div>
          ⏱️ Tiempo: <strong>{formatMs(timeMs)}</strong>
        </div>
        <div>
          🧮 Movimientos: <strong>{moves}</strong>
        </div>
        <div className={`status ${status}`}>
          {status === 'won'
            ? '¡Completado! 🎉'
            : status === 'playing'
            ? 'Jugando…'
            : 'Listo'}
        </div>
        <button onClick={restart} className='restart-btn'>
          Restart
        </button>
      </div>

      <div className='memory-grid'>
        {deck.map((c, i) => (
          <Card
            key={c.id}
            value={c.value}
            isFlipped={flipped.includes(i) || matched.has(i)}
            onClick={() => handleFlip(i)}
          />
        ))}
      </div>

      <div className='memory-ranking'>
        <h3>🏁 Top 5 (sesión)</h3>
        {rankings.length === 0 ? (
          <p className='empty'>Aún no hay tiempos registrados.</p>
        ) : (
          <ol>
            {rankings.map((r, idx) => (
              <li key={r.date}>
                #{idx + 1} — {formatMs(r.timeMs)}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  )
}
