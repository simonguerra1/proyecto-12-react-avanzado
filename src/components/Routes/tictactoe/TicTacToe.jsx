import useTicTacToe from '../../games/tictactoe/useTicTacToe.jsx'
import Board from '../../games/tictactoe/board/Board.jsx'
import Score from '../../games/tictactoe/Score/Score.jsx'
import './TicTacToe.css'

export default function TicTacToe() {
  const game = useTicTacToe()

  return (
    <section className='tic-tac-toe'>
      <Score
        xWins={game.xWins}
        oWins={game.oWins}
        ties={game.ties}
        next={game.next}
        winner={game.winner}
      />

      <div className='board-wrapper'>
        <Board board={game.board} onPlay={game.play} winner={game.winner} />
      </div>

      <div className='tic-tac-toe-controls'>
        <button onClick={game.reset} className='btn'>
          Reiniciar
        </button>
        <button onClick={game.undo} disabled={!game.canUndo} className='btn'>
          Deshacer
        </button>
      </div>
    </section>
  )
}
