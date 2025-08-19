import { useReducer, useMemo, useCallback, useEffect } from 'react'

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function calcWinner(board) {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c])
      return board[a]
  }
  return null
}

const initialState = {
  board: Array(9).fill(null),
  xIsNext: true,
  history: [],
  xWins: 0,
  oWins: 0,
  ties: 0,
  status: 'playing'
}

function reducer(state, action) {
  switch (action.type) {
    case 'play': {
      const { index } = action
      if (state.status !== 'playing') return state
      if (state.board[index]) return state

      const nextBoard = state.board.slice()
      nextBoard[index] = state.xIsNext ? 'X' : 'O'

      return {
        ...state,
        board: nextBoard,
        xIsNext: !state.xIsNext,
        history: [...state.history, state.board]
      }
    }

    case 'finalize': {
      const winner = action.winner
      if (state.status === 'ended') return state

      if (winner === 'X')
        return { ...state, xWins: state.xWins + 1, status: 'ended' }
      if (winner === 'O')
        return { ...state, oWins: state.oWins + 1, status: 'ended' }
      return { ...state, ties: state.ties + 1, status: 'ended' }
    }

    case 'reset': {
      return {
        ...state,
        board: Array(9).fill(null),
        xIsNext: true,
        history: [],
        status: 'playing'
      }
    }

    case 'undo': {
      if (state.status !== 'playing') return state
      if (state.history.length === 0) return state
      const prev = state.history[state.history.length - 1]
      return {
        ...state,
        board: prev,
        history: state.history.slice(0, -1),
        xIsNext: !state.xIsNext
      }
    }

    default:
      return state
  }
}

export default function useTicTacToe() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const winner = useMemo(() => calcWinner(state.board), [state.board])
  const isFull = useMemo(() => state.board.every(Boolean), [state.board])

  useEffect(() => {
    if (state.status === 'playing' && (winner || isFull)) {
      dispatch({ type: 'finalize', winner: winner ?? null })
    }
  }, [winner, isFull, state.status])

  const play = useCallback((index) => dispatch({ type: 'play', index }), [])
  const reset = useCallback(() => dispatch({ type: 'reset' }), [])
  const undo = useCallback(() => dispatch({ type: 'undo' }), [])

  return {
    board: state.board,
    next: state.xIsNext ? 'X' : 'O',
    winner,
    status: state.status,
    xWins: state.xWins,
    oWins: state.oWins,
    ties: state.ties,
    canUndo: state.status === 'playing' && state.history.length > 0,
    play,
    reset,
    undo
  }
}
