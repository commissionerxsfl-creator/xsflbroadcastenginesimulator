import { create } from 'zustand'

const initialGameState = {
  homeTeam: null,
  awayTeam: null,
  leagueLogo: null,
  currentQuarter: 1,
  gameTime: 900, // 15 minutes per quarter
  homeScore: 0,
  awayScore: 0,
  possession: 'home',
  ballPosition: 20, // yards from home end zone
  down: 1,
  distance: 10,
  gameStarted: false,
  gamePaused: false,
  playHistory: [],
  homeStats: {
    rushingYards: 0,
    passingYards: 0,
    conversions: 0,
    safeties: 0,
    fieldGoals: 0,
  },
  awayStats: {
    rushingYards: 0,
    passingYards: 0,
    conversions: 0,
    safeties: 0,
    fieldGoals: 0,
  },
}

export const useGameStore = create((set) => ({
  ...initialGameState,

  initGame: (homeTeam, awayTeam, leagueLogo) =>
    set({
      homeTeam,
      awayTeam,
      leagueLogo,
      gameStarted: true,
      gamePaused: false,
      currentQuarter: 1,
      gameTime: 900,
      homeScore: 0,
      awayScore: 0,
      possession: 'home',
      ballPosition: 20,
      down: 1,
      distance: 10,
      playHistory: [],
    }),

  updateScore: (team, points) =>
    set((state) => ({
      [team === 'home' ? 'homeScore' : 'awayScore']:
        (team === 'home' ? state.homeScore : state.awayScore) + points,
    })),

  updateGameTime: (newTime) =>
    set((state) => {
      if (newTime < 0) {
        return { gameTime: 0, currentQuarter: state.currentQuarter + 1, gameTime: 900 }
      }
      return { gameTime: newTime }
    }),

  togglePause: () =>
    set((state) => ({ gamePaused: !state.gamePaused })),

  updateBallPosition: (position) =>
    set({ ballPosition: position }),

  updateDown: (down, distance) =>
    set({ down, distance }),

  changePossession: () =>
    set((state) => ({ possession: state.possession === 'home' ? 'away' : 'home' })),

  addPlayHistory: (play) =>
    set((state) => ({ playHistory: [...state.playHistory, play] })),

  updateStats: (team, stat, value) =>
    set((state) => ({
      [team === 'home' ? 'homeStats' : 'awayStats']: {
        ...state[team === 'home' ? 'homeStats' : 'awayStats'],
        [stat]: state[team === 'home' ? 'homeStats' : 'awayStats'][stat] + value,
      },
    })),

  resetGame: () => set(initialGameState),
}))
