/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './Style.css';
import Container from '@material-ui/core/Container';
import GameCard from '../../components/GameCard/GameCard'
import AnswerCard from '../../components/AnswerCard/AnswerCard'
import io from 'socket.io-client'
import { makeStyles, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  header: {
    fontWeight: "lighter",
    margin: "1rem"
  }
}))

const Game = () => {
  const classes = useStyles()
  const name = localStorage.getItem('name')
  const [socket, setSocket] = useState(null)
  const [players, setPlayers] = useState([])
  const [gameStarted, setGameStarted] = useState(false)
  const [question, setQuestion] = useState({ question: "", 1: "1", 2: "2", 3: "3", 4: "4", correct: "4" })
  let history = useHistory()

  useEffect(() => {
    const socket = io('http://localhost')
    setSocket(socket)
    
    socket.on('connect', () => {
      console.log(`Connected to server as ${name}`)
      if(typeof name === "string") {
        socket.emit('user', name)
      }
    })

    socket.on('players', (data) => {
      setPlayers(data)
    })

    socket.on('question', data => {
      setGameStarted(true)
      setQuestion(data)
    })
    socket.on('end-of-game', data => {
      history.push('/result')
      // setGameStarted(false)
    })
  }, [])

  const startGame = (selected) => {
    socket.emit("start-game", selected)
  }

  const postAnswer = (answer) => {
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

  return (
    <div>
      <Container maxWidth="lg">
        <p>Connected Players</p>
        <ul>
          { players.map(player => <li>{player.name} - Points: {player.points}</li>)}
        </ul>
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
            Question - {question.question}
        </Typography>
        <div className="games-container">
          <AnswerCard {...{
            option: question.option_1,
            postAnswer: () => { postAnswer(question.option_1) }
          }} />
          <AnswerCard {...{
            option: question.option_2,
            postAnswer: () => { postAnswer(question.option_2) }
          }} />
          <AnswerCard {...{
            option: question.option_3,
            postAnswer: () => { postAnswer(question.option_3) }
          }} />
          <AnswerCard {...{
            option: question.option_4,
            postAnswer: () => { postAnswer(question.option_4) }
          }} />
        </div>
        </div>
        )}
      </Container>
    </div>
  );
}

export default Game;
