import { useGameStore } from '../store/gameStore'

class GameEngine {
  constructor() {
    this.gameStore = null
  }

  initializeEngine(store) {
    this.gameStore = store
  }

  // Scoring Methods
  scoreTouchdown(team) {
    const store = this.gameStore.getState()
    const basePoints = 7
    this.gameStore.updateScore(team, basePoints)
    this.gameStore.addPlayHistory({
      type: 'TOUCHDOWN',
      team,
      points: basePoints,
      timestamp: new Date(),
    })
    this.evaluateConversion(team)
  }

  evaluateConversion(team) {
    const store = this.gameStore.getState()
    const leadingTeam = store.homeScore > store.awayScore ? 'home' : 'away'
    const scoreDiff =
      Math.abs(store.homeScore - store.awayScore)
    const isTrailing = team !== leadingTeam && scoreDiff <= 5

    let conversionTier = 1
    if (isTrailing) {
      conversionTier = Math.min(scoreDiff, 5)
    } else {
      conversionTier = Math.floor(Math.random() * 5) + 1
    }

    this.executeConversion(team, conversionTier)
  }

  executeConversion(team, tier) {
    const conversionPoints = [1, 2, 3, 4, 5]
    const yardLines = [20, 2, 5, 10, 20]

    const success = Math.random() > 0.3 // 70% success rate
    const points = success ? conversionPoints[tier - 1] : 0

    if (points > 0) {
      this.gameStore.updateScore(team, points)
      this.gameStore.addPlayHistory({
        type: `CONVERSION_${tier}PT`,
        team,
        points,
        success,
        timestamp: new Date(),
      })
    }
  }

  scoreFieldGoal(team, distance) {
    let points = 2
    if (distance >= 30 && distance < 60) points = 3
    else if (distance >= 60 && distance < 70) points = 4
    else if (distance >= 70) points = 5

    const success = Math.random() > 0.25
    if (success) {
      this.gameStore.updateScore(team, points)
      this.gameStore.addPlayHistory({
        type: 'FIELD_GOAL',
        team,
        points,
        distance,
        timestamp: new Date(),
      })
    } else {
      // Upright Doink Rule
      const doink = Math.random() > 0.7
      if (doink) {
        this.gameStore.updateScore(team, 1)
        this.gameStore.addPlayHistory({
          type: 'DOINK',
          team,
          points: 1,
          distance,
          timestamp: new Date(),
        })
      } else {
        this.gameStore.addPlayHistory({
          type: 'MISSED_FG',
          team,
          distance,
          timestamp: new Date(),
        })
      }
    }
  }

  scoreSafety(team, isDeepField = false) {
    const points = isDeepField ? 3 : 2
    this.gameStore.updateScore(team, points)
    this.gameStore.addPlayHistory({
      type: isDeepField ? 'DEEP_SAFETY' : 'SAFETY',
      team,
      points,
      timestamp: new Date(),
    })
  }

  scorePickSix(team) {
    this.gameStore.updateScore(team, 9)
    this.gameStore.addPlayHistory({
      type: 'PICK_SIX',
      team,
      points: 9,
      timestamp: new Date(),
    })
  }

  scoreFumbleRecovery(team) {
    this.gameStore.updateScore(team, 1)
    this.gameStore.addPlayHistory({
      type: 'FUMBLE_RECOVERY',
      team,
      points: 1,
      timestamp: new Date(),
    })
  }

  // Play Selection AI
  selectPlay(team, offenseWeight, defenseWeight) {
    const playTypes = ['PASS', 'RUN', 'SCREEN']
    const weights = [
      offenseWeight / 100,
      (100 - offenseWeight) / 100,
      0.1,
    ]

    const rand = Math.random()
    let cumulative = 0
    for (let i = 0; i < weights.length; i++) {
      cumulative += weights[i]
      if (rand < cumulative) {
        return playTypes[i]
      }
    }
    return playTypes[0]
  }

  executePlay(playType, team, offenseWeight) {
    let yards = 0
    const successProbability = 0.6
    const success = Math.random() < successProbability

    if (success) {
      if (playType === 'PASS') {
        yards = Math.floor(Math.random() * 20) + 5
      } else if (playType === 'RUN') {
        yards = Math.floor(Math.random() * 8) + 2
      } else if (playType === 'SCREEN') {
        yards = Math.floor(Math.random() * 12) + 3
      }
    } else {
      yards = -(Math.floor(Math.random() * 3) + 1)
    }

    return { playType, yards, success }
  }

  // Late Game Mechanics
  alternativeOnside(team) {
    const store = this.gameStore.getState()
    this.gameStore.updateBallPosition(30)
    this.gameStore.updateDown(1, 10)
    this.gameStore.addPlayHistory({
      type: 'ALTERNATIVE_ONSIDE',
      team,
      position: 30,
      timestamp: new Date(),
    })
  }

  overtimeLogic() {
    const store = this.gameStore.getState()
    // 5-point TDs, alternating possessions
    return {
      tdValue: 5,
      conversionDisabled: true,
      alternatingPossessions: true,
    }
  }

  // Special Rules
  tushPush() {
    return {
      type: 'TUSH_PUSH',
      successRate: 0.95,
      yards: 1,
    }
  }

  mandatoryTieRule(team, scoreDiff) {
    if (scoreDiff >= 1 && scoreDiff <= 5) {
      return true // Force conversion tier
    }
    return false
  }
}

export default GameEngine
