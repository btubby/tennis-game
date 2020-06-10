import TennisGame from "./TennisGame"

const player1Name = "Roger"
const player2Name = "Tim"

const testCases = [
  // Player1 Points, Player2 Points, tennis-speak
  [0, 0, "0-0"],

  [1, 0, "15-0"],
  [2, 0, "30-0"],
  [3, 0, "40-0 GAMEPOINT"],

  [0, 1, "0-15"],
  [0, 2, "0-30"],
  [0, 3, "0-40 BREAKPOINT"],

  [1, 1, "15-15"],
  [1, 2, "15-30"],
  [1, 3, "15-40 BREAKPOINT"],
  [2, 2, "30-30"],
  [2, 3, "30-40 BREAKPOINT"],
  [2, 1, "30-15"],
  [3, 1, "40-15 GAMEPOINT"],
  [3, 2, "40-30 GAMEPOINT"],

  // 3 points each (40-40) is 'Deuce'.  Unless clear 2 point lead, this continues
  [3, 3, "40-40"],
  [4, 4, "40-40"],
  [80, 80, "40-40"],

  // scores are >= 4 and a player has one point more than their opponent
  [4, 3, "A-40 GAMEPOINT"],
  [80, 79, "A-40 GAMEPOINT"],
  [3, 4, "40-A BREAKPOINT"],
  [8, 9, "40-A BREAKPOINT"],

  // clear win
  [4, 0, `Game ${player1Name}`],
  [4, 1, `Game ${player1Name}`],
  [0, 4, `Game ${player2Name}`],
  [2, 4, `Game ${player2Name}`],

  // When scores are 4+, the winner must win by 2 clear points
  [6, 4, `Game ${player1Name}`],
  [4, 6, `Game ${player2Name}`],
  [16, 14, `Game ${player1Name}`],
  [14, 16, `Game ${player2Name}`],
]

describe("tennis game tests", function () {
  testCases.forEach((testCase) => {
    // Fresh game for each testcase
    let newGame = new TennisGame({
      player1Name: player1Name,
      player2Name: player2Name,
    })
    const p1TestScore = testCase[0]
    const p2TestScore = testCase[1]
    const tennisSpeakScore = testCase[2]

    // arrange - increment the game score to match the testcase
    const loops = Math.max(p1TestScore, p2TestScore)
    for (let i = 0; i < loops; i++) {
      if (i < p1TestScore) {
        newGame.winRally("p1")
      }
      if (i < p2TestScore) {
        newGame.winRally("p2")
      }
    }
    // act
    const gameScore = newGame.getScore()

    // assert
    test(`${p1TestScore}-${p2TestScore} = ${gameScore}`, () => {
      expect(gameScore).toEqual(tennisSpeakScore)
    })
  })
})
