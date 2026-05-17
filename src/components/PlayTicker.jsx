import { useGameStore } from '../store/gameStore'

const PlayTicker = () => {
  const gameStore = useGameStore()
  const lastPlay = gameStore.playHistory[gameStore.playHistory.length - 1]

  const getPlayDescription = (play) => {
    if (!play) return 'Awaiting first play...'

    switch (play.type) {
      case 'TOUCHDOWN':
        return `${play.team === 'home' ? gameStore.homeTeam?.abbreviation : gameStore.awayTeam?.abbreviation} TOUCHDOWN! +${play.points}`
      case 'FIELD_GOAL':
        return `${play.team === 'home' ? gameStore.homeTeam?.abbreviation : gameStore.awayTeam?.abbreviation} FIELD GOAL! ${play.distance}yd, +${play.points}`
      case 'DOINK':
        return `UPRIGHT DOINK! +${play.points} point awarded`
      case 'SAFETY':
        return `SAFETY! +${play.points} points to defense`
      case 'PICK_SIX':
        return `PICK-SIX! ${play.team === 'home' ? gameStore.homeTeam?.abbreviation : gameStore.awayTeam?.abbreviation}, +${play.points}`
      default:
        return 'Play in progress...'
    }
  }

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-3/4 glass neon-border p-4 rounded-lg animate-fade-slide-up">
      <div className="flex items-center gap-4">
        <div className="w-2 h-2 bg-neon-cyan rounded-full animate-glow-pulse"></div>
        <div className="font-orbitron text-neon-cyan text-glow text-sm">
          {getPlayDescription(lastPlay)}
        </div>
      </div>
    </div>
  )
}

export default PlayTicker
