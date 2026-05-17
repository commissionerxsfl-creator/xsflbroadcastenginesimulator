import { useState } from 'react'
import ConfigDashboard from './components/ConfigDashboard'
import BroadcastCanvas from './components/BroadcastCanvas'
import { useGameStore } from './store/gameStore'

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const { initGame } = useGameStore()

  const handleInitBroadcast = (homeTeam, awayTeam, leagueLogo) => {
    initGame(homeTeam, awayTeam, leagueLogo)
    setGameStarted(true)
  }

  const handleNewGame = () => {
    setGameStarted(false)
  }

  return (
    <div className="w-screen h-screen bg-black">
      {!gameStarted ? (
        <ConfigDashboard onInitBroadcast={handleInitBroadcast} />
      ) : (
        <BroadcastCanvas onNewGame={handleNewGame} />
      )}
    </div>
  )
}

export default App
