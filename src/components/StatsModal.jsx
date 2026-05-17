import { useGameStore } from '../store/gameStore'

const StatsModal = ({ onClose }) => {
  const gameStore = useGameStore()

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="glass neon-border p-8 rounded-lg w-3/4 max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold font-orbitron text-neon-cyan text-glow">MATCH STATISTICS</h2>
          <button
            onClick={onClose}
            className="text-neon-cyan hover:text-neon-yellow text-2xl font-bold font-orbitron"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Home Team Stats */}
          <div className="border-r-2 border-neon-cyan pr-4">
            <h3 className="text-xl font-bold font-orbitron text-neon-yellow mb-4">
              {gameStore.homeTeam?.abbreviation || 'HOME'}
            </h3>
            <div className="space-y-2 font-orbitron text-sm">
              <div className="flex justify-between">
                <span>Rushing Yards:</span>
                <span className="text-neon-cyan">{gameStore.homeStats.rushingYards}</span>
              </div>
              <div className="flex justify-between">
                <span>Passing Yards:</span>
                <span className="text-neon-cyan">{gameStore.homeStats.passingYards}</span>
              </div>
              <div className="flex justify-between">
                <span>Conversions:</span>
                <span className="text-neon-cyan">{gameStore.homeStats.conversions}</span>
              </div>
              <div className="flex justify-between">
                <span>Safeties:</span>
                <span className="text-neon-cyan">{gameStore.homeStats.safeties}</span>
              </div>
              <div className="flex justify-between">
                <span>Field Goals:</span>
                <span className="text-neon-cyan">{gameStore.homeStats.fieldGoals}</span>
              </div>
            </div>
          </div>

          {/* Away Team Stats */}
          <div>
            <h3 className="text-xl font-bold font-orbitron text-neon-yellow mb-4">
              {gameStore.awayTeam?.abbreviation || 'AWAY'}
            </h3>
            <div className="space-y-2 font-orbitron text-sm">
              <div className="flex justify-between">
                <span>Rushing Yards:</span>
                <span className="text-neon-cyan">{gameStore.awayStats.rushingYards}</span>
              </div>
              <div className="flex justify-between">
                <span>Passing Yards:</span>
                <span className="text-neon-cyan">{gameStore.awayStats.passingYards}</span>
              </div>
              <div className="flex justify-between">
                <span>Conversions:</span>
                <span className="text-neon-cyan">{gameStore.awayStats.conversions}</span>
              </div>
              <div className="flex justify-between">
                <span>Safeties:</span>
                <span className="text-neon-cyan">{gameStore.awayStats.safeties}</span>
              </div>
              <div className="flex justify-between">
                <span>Field Goals:</span>
                <span className="text-neon-cyan">{gameStore.awayStats.fieldGoals}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Play History */}
        <div className="mt-8 border-t-2 border-neon-cyan pt-6">
          <h3 className="text-lg font-bold font-orbitron text-neon-cyan mb-4">Play History</h3>
          <div className="bg-dark-surface rounded p-4 max-h-48 overflow-y-auto">
            {gameStore.playHistory.length === 0 ? (
              <p className="text-gray-400 font-orbitron text-sm">No plays yet...</p>
            ) : (
              <div className="space-y-2">
                {gameStore.playHistory.slice().reverse().map((play, idx) => (
                  <div key={idx} className="text-xs font-orbitron text-gray-300 border-b border-neon-cyan pb-1">
                    {play.type}: +{play.points} points
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="glass px-8 py-2 font-orbitron text-neon-cyan border-2 border-neon-cyan neon-glow hover:bg-neon-cyan hover:text-black transition-all"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  )
}

export default StatsModal
