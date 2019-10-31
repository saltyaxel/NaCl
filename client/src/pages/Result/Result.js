import React, { useState, useEffect } from 'react';
import './Style.css';
import Container from '@material-ui/core/Container';
import { Button, makeStyles, Typography } from '@material-ui/core';

import Scoreboard from '../../components/Scoreboard/Scoreboard'
import { useHistory } from 'react-router-dom';
const classNames = require('classnames');

const url = process.env.NODE_ENV === "development" ? 'http://localhost:8000' : 'https://live-quiz-hackday.herokuapp.com'

const useStyles = makeStyles(() => ({
  container: {
    height: "100%"
  },
  header: {
    fontWeight: "lighter",
    marginTop: "1rem"
  },
  button: {
    marginTop: "1rem"
  },
  connectedPlayersHeader: {
    marginBottom: "0"
  },
}))

const Home = () => {
  const classes = useStyles()

  const [result, setResult] = useState([])

  useEffect(() => {
    const getResult = async () => {
      const res = await fetch(url + '/result')
      const data = await res.json()
      const sortedData = data.sort( (a, b) => {
        if(a.points < b.points) {
          return 1
        }
        if(a.points > b.points) {
          return -1
        }
        return 0
      })
      setResult(sortedData)
    }
    getResult()
  }, [])

  let history = useHistory()
  const playAgain = () => {
    history.push('/play')
  }

  return (
    <Container className={classes.container} maxWidth="lg">
      <Typography className={classNames(classes.connectedPlayersHeader, classes.header)} variant="h4">
          Scoreboard
        </Typography>
        <Scoreboard {...{
          players: result
        }} />

      <Button className={classes.button} onClick={playAgain} variant="contained" size="large" color="primary">Play Again?</Button>
    </Container>
  );
}

export default Home;
