import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGameStore } from '../store/gameStore'
import Field from './Field'
import Scoreboard from './Scoreboard'
import PlayTicker from './PlayTicker'
import StatsModal from './StatsModal'

const BroadcastCanvas = ({ onNewGame }) => {
  const gameStore = useGameStore()
  const [showStats, setShowStats] = useState(false)

  useEffect(() => {
    // Game loop
    const gameInterval = setInterval(() => {
      if (!gameStore.gamePaused && gameStore.gameStarted) {
        gameStore.updateGameTime(gameStore.gameTime - 1)
      }
    }, 1000)

    return () => clearInterval(gameInterval)
  }, [gameStore])

  return (
    <div className="w-full h-full flex flex-col relative">
      {/* 3D Field Canvas */}
      <div className="flex-1 relative">
        <Canvas camera={{ position: [0, 40, 50], fov: 45 }}>
          <color attach="background" args={['#000000']} />
          <ambientLight intensity={1} />
          <directionalLight position={[100, 100, 50]} intensity={1} />
          <Field />
        </Canvas>

        {/* Play Ticker (Top) */}
        <PlayTicker />
      </div>

      {/* Scoreboard (Bottom - 5x Height) */}
      <div className="h-1/3">
        <Scoreboard onShowStats={() => setShowStats(true)} />
      </div>

      {/* Stats Modal */}
      {showStats && <StatsModal onClose={() => setShowStats(false)} />}
    </div>
  )
}

export default BroadcastCanvas
