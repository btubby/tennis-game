import React, { useState, useEffect, useRef } from "react"
import TennisGame from "../TennisGame"
import {
  Container,
  Title,
  TennisContent,
  TennisForm,
  ButtonContainer,
  TennisResults,
} from "./Tennis.styles"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button/Button"
import { withStyles } from "@material-ui/core/styles"

const styles = () => ({
  textField: {
    width: "90%",
    margin: "10px 0",
  },
  input: {
    color: "white",
  },
})

const TennisTextField = withStyles({
  root: {
    color: "#FFF",
    "& label.Mui-focused": {
      color: "green",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#54018B",
      },
    },
  },
})(TextField)

const ColorButton = withStyles((theme) => ({
  root: {
    padding: "20px",
    width: "90%",
    color: "#FFF",
    backgroundColor: "#54018B",
    "&:hover": {
      backgroundColor: "#9C27B0",
    },
  },
}))(Button)

function Tennis(props) {
  const { classes } = props

  // Used to identify first render
  const firstRender = useRef(true)

  const [disableButton, setDisabledButton] = useState(true)
  const [playerOneName, setPlayerOneName] = useState("")
  const [playerTwoName, setPlayerTwoName] = useState("")
  const [gameOutput, setGameOutput] = useState([])

  useEffect(() => {
    // skip validation on first render
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    setDisabledButton(formValidation)
    // eslint-disable-next-line
  }, [playerOneName, playerTwoName])

  const formValidation = () => {
    if (playerOneName === "" || playerTwoName === "") {
      return true
    }
    return false
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setGameOutput([])
    let tennisGame = new TennisGame({
      player1Name: playerOneName,
      player2Name: playerTwoName,
    })

    // Simulate a game
    let gameComplete = false

    setGameOutput(["New balls please."])
    do {
      let output = simulateRally(tennisGame)

      const gameScore = tennisGame.getScore()
      if (gameScore.match(/^Game/)) {
        gameComplete = true
      }

      setGameOutput((gameOutput) => [
        ...gameOutput,
        ` ${output} : ${gameScore}`,
      ])

      if (gameComplete) {
        setGameOutput((gameOutput) => [...gameOutput, `We have a winner 🎉`])
        break
      }
    } while (1)
  }

  const simulateRally = (tennisGame) => {
    if (!!getAWinner()) {
      tennisGame.winRally("p1")
      return `🎾 ${playerOneName} wins a point`
    } else {
      tennisGame.winRally("p2")
      return `🎾 ${playerTwoName} wins a point`
    }
  }

  const getAWinner = () => {
    return Math.floor(Math.random() * Math.floor(2))
  }

  return (
    <Container>
      <Title>Tennis Game Simulation</Title>
      <TennisContent>
        <TennisForm>
          <form onSubmit={handleSubmit}>
            <TennisTextField
              name="p2"
              InputProps={{
                style: {
                  color: "white",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "yellow",
                },
              }}
              label="Player Name (serving)"
              value={playerOneName}
              onChange={(e) => setPlayerOneName(e.target.value)}
              className={classes.textField}
            />
            <TennisTextField
              name="p2"
              InputProps={{
                style: {
                  color: "white",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "yellow",
                },
              }}
              label="Player Name"
              value={playerTwoName}
              onChange={(e) => setPlayerTwoName(e.target.value)}
              className={classes.textField}
            />
            <ButtonContainer>
              <ColorButton
                variant="contained"
                color="primary"
                type="submit"
                disabled={disableButton}
                className={classes.button}
              >
                Play Game!
              </ColorButton>
            </ButtonContainer>
          </form>
        </TennisForm>
        <TennisResults>
          {gameOutput.map((number, i) => (
            <div key={i}>{number}</div>
          ))}
        </TennisResults>
      </TennisContent>
    </Container>
  )
}
export default withStyles(styles)(Tennis)
