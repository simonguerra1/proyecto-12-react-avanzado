import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Home from './components/Routes/home/Home.jsx'
import TicTacToe from './components/Routes/tictactoe/tictactoe.jsx'
import Memory from './components/Routes/memory/Memory.jsx'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tic-tac-toe' element={<TicTacToe />} />
        <Route path='/memory' element={<Memory />} />
      </Routes>
    </Layout>
  )
}
