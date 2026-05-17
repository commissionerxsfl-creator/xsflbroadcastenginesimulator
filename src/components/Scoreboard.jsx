import { useGameStore } from '../store/gameStore'

const Scoreboard = ({ onShowStats }) => {
  const gameStore = useGameStore()

  const togglePause = () => {
    gameStore.togglePause()
  }

  const handleNewGame = () => {
    gameStore.resetGame()
    window.location.reload()
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  return (
    <div className="w-full h-full glass neon-border flex items-stretch animate-fade-slide-up">
      {/* League Logo Left */}
      <div className="w-1/6 flex items-center justify-center border-r-2 border-neon-cyan p-4">
        {gameStore.leagueLogo ? (
          <img src={gameStore.leagueLogo} alt="League" className="h-20" />
        ) : (
          <div className="text-neon-cyan font-orbitron text-xl text-glow">XSFL</div>
        )}
      </div>

      {/* Home Team */}
      <div className="w-1/5 flex flex-col justify-center items-center border-r-2 border-neon-cyan p-4 space-y-2">
        {gameStore.homeTeam?.logo && (
          <img src={gameStore.homeTeam.logo} alt="Home" className="h-12" />
        )}
        <div className="text-2xl font-bold font-orbitron text-neon-cyan">{gameStore.homeTeam?.abbreviation}</div>
        <div className="text-xs font-orbitron text-gray-300">{gameStore.homeTeam?.record}</div>
        <div className="text-3xl font-bold font-orbitron" style={{ color: gameStore.homeTeam?.primaryColor }}>
          {gameStore.homeScore}
        </div>
        {gameStore.possession === 'home' && <div className="text-neon-yellow font-orbitron">●</div>}
      </div>

      {/* Time/Quarter */}
      <div className="w-1/4 flex flex-col justify-center items-center border-r-2 border-neon-cyan p-4 space-y-2">
        <div className="text-lg font-orbitron text-neon-yellow">Q{gameStore.currentQuarter}</div>
        <div className="text-3xl font-bold font-orbitron text-neon-cyan text-glow">
          {formatTime(gameStore.gameTime)}
        </div>
        <div className="text-sm font-orbitron text-gray-400">YRD {gameStore.ballPosition}</div>
      </div>

      {/* Away Team */}
      <div className="w-1/5 flex flex-col justify-center items-center border-r-2 border-neon-cyan p-4 space-y-2">
        {gameStore.awayTeam?.logo && (
          <img src={gameStore.awayTeam.logo} alt="Away" className="h-12" />
        )}
        <div className="text-2xl font-bold font-orbitron text-neon-cyan">{gameStore.awayTeam?.abbreviation}</div>
        <div className="text-xs font-orbitron text-gray-300">{gameStore.awayTeam?.record}</div>
        <div className="text-3xl font-bold font-orbitron" style={{ color: gameStore.awayTeam?.primaryColor }}>
          {gameStore.awayScore}
        </div>
        {gameStore.possession === 'away' && <div className="text-neon-yellow font-orbitron">●</div>}
      </div>

      {/* Down & Distance */}
      <div className="w-1/6 flex flex-col justify-center items-center bg-white p-4">
        <div className="text-2xl font-bold font-orbitron text-black">
          {gameStore.down}RD & {gameStore.distance}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
        <button
          onClick={togglePause}
          className="glass px-6 py-2 font-orbitron text-neon-cyan border-2 border-neon-cyan neon-glow hover:bg-neon-cyan hover:text-black transition-all"
        >
          {gameStore.gamePaused ? 'PLAY' : 'PAUSE'}
        </button>
        <button
          onClick={() => onShowStats()}
          className="glass px-6 py-2 font-orbitron text-neon-cyan border-2 border-neon-cyan neon-glow hover:bg-neon-cyan hover:text-black transition-all"
        >
          STATS VIEW
        </button>
        <button
          onClick={handleNewGame}
          className="glass px-6 py-2 font-orbitron text-neon-cyan border-2 border-neon-cyan neon-glow hover:bg-neon-cyan hover:text-black transition-all"
        >
          NEW GAME
        </button>
      </div>
    </div>
  )
}

export default Scoreboard
