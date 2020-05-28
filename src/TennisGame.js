import { Component } from "react"

const scoreMap = {
  // points won to tennis-speak
  0: "0",
  1: "15",
  2: "30",
  3: "40",
}

export default class TennisGame extends Component {
  constructor(props) {
    super(props)
    this.player1 = {
      name: props.player1Name,
      score: 0,
    }
    this.player2 = {
      name: props.player2Name,
      score: 0,
    }
  }

  // Increment the score of the game winner.
  winRally = (player) => {
    player === "p1" ? (this.player1.score += 1) : (this.player2.score += 1)
  }

  // Return the current tennis-speak game score as a string.
  getScore = () => {
    if (this.player1.score === this.player2.score) {
      return this.scoresAreEqual()
    }
    if (this.player1.score >= 4 || this.player2.score >= 4) {
      return this.points4OrMore()
    }
    return this.simpleScore()
  }

  // Return tennis-speak score in format p1-p2
  simpleScore = () => {
    return `${scoreMap[this.player1.score]}-${scoreMap[this.player2.score]}`
  }

  // For any 'Deuce' (1st, 2nd or 85th) we want to return '40-40'
  scoresAreEqual = () => {
    return this.player1.score >= 3
      ? "40-40"
      : `${scoreMap[this.player1.score]}-${scoreMap[this.player2.score]}`
  }

  points4OrMore = () => {
    let diff = this.player1.score - this.player2.score
    if (diff === 1) {
      // 'advantage player1'
      return "A-40"
    }
    if (diff === -1) {
      // 'advantage player2'
      return "40-A"
    }
    if (diff >= 2) {
      return `Game ${this.player1.name}`
    }
    return `Game ${this.player2.name}`
  }
}
