/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import './Style.css'
import AnswerCard from '../../components/AnswerCard/AnswerCard'
import GameCard from '../../components/GameCard/GameCard'
import Scoreboard from '../../components/Scoreboard/Scoreboard'
import { Container, makeStyles, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import classNames from 'classnames'
import ReactCountdownClock from 'react-countdown-clock'
import { useStateValue } from '../../state';

const useStyles = makeStyles(() => ({
  header: {
    fontWeight: "lighter",
    margin: "1rem"
  },
  connectedPlayersHeader: {
    marginBottom: "0"
  }
}))

const Game = () => {
  const [{ name, socket }] = useStateValue();
  let history = useHistory()
  const classes = useStyles()
  const [players, setPlayers] = useState([])
  const [gameStarted, setGameStarted] = useState(false)
  const [question, setQuestion] = useState({ question: "", 1: "1", 2: "2", 3: "3", 4: "4", correct: "4" })
  const [questionAnswered, setQuestionAnswered] = useState(false)

  useEffect(() => {
    if(typeof name === "string") {
      socket.emit('user', name)
    }
  
    socket.on('players', data => {
      setPlayers(data)
    })

    socket.on('question', data => {
      setQuestionAnswered(false)
      setGameStarted(true)
      setQuestion(data)
    })

    socket.on('end-of-game', () => {
      history.push('/result')
      setGameStarted(false)
    })
  }, [])

  const startGame = (selected) => {
    socket.emit("start-game", selected)
  }

  const postAnswer = (answer) => {
    setQuestionAnswered(true)
    if(!questionAnswered) {
      if(answer === question.correct) {
        socket.emit("answer", ({
          points: 1
        }))
      } else {
        socket.emit("answer", ({
          points: 0
        }))
      }
    }
  }

  return (
    <div className="game">

      <Container maxWidth="lg">

        { !gameStarted ? (
        <div>
          <Typography className={classes.header} variant="h4">
            Waiting for game leader to select a quiz...
          </Typography>   
        <div className="games-container">
          <GameCard {...{
            header: "Sodium Chloride Quiz",
            text: "Test your knowledge about sodium chlorde or as we know it, salt.",
            startGame: () => { startGame('Salt') },
            image: "Salt"
          }}/>
          <GameCard {...{
            header: "MMA Quiz",
            text: "Test your knowledge in the greatest sport of all time!",
            startGame: () => { startGame('MMA') },
            image: "MMA"
          }}/>
          <GameCard {...{
            header: "React Hooks Quiz",
            text: "Test your knowledge about React Hooks and see who's the best coder.",
            startGame: () => { startGame('React') },
            image: "React"
          }}/>
          <GameCard {...{
            header: "2Pac Quiz",
            text: "Test your knowledge about the greatest rapper of all time.",
            startGame: () => { startGame('2Pac') },
            image: "2Pac"
          }}/>
        </div>
        </div>
        ) : (  
        <div>
        <Typography className={classes.header} variant="h4">
            {question.question}
        </Typography>
        <div className="games-container">
          <AnswerCard {...{
            option: question.option_1,
            postAnswer: () => { postAnswer(question.option_1) },
            color: "orange"
          }} />
          <AnswerCard {...{
            option: question.option_2,
            postAnswer: () => { postAnswer(question.option_2) },
            color: "green"
          }} />
          <AnswerCard {...{
            option: question.option_3,
            postAnswer: () => { postAnswer(question.option_3) },
            color: "blue"
          }} />
          <AnswerCard {...{
            option: question.option_4,
            postAnswer: () => { postAnswer(question.option_4) },
            color: "yellow"
          }} />
        </div>
        <div className="wrapperCountdown">
          <ReactCountdownClock
            key={question.question}
            seconds={10}
            color="#000"
            alpha={0.9}
            size={300}
            onComplete={() => {}} />
        </div>
        </div>
        )}
        <Typography className={classNames(classes.connectedPlayersHeader, classes.header)} variant="h4">
          Connected Players
        </Typography>

        <Scoreboard {...{
          players: players
        }}/>
      </Container>
    </div>
  );
}

export default Game;
