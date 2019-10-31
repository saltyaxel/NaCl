import React, { useState, useEffect } from 'react';
import './Style.css';
import Container from '@material-ui/core/Container';
import { Button, makeStyles, Typography } from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useHistory } from 'react-router-dom';
const classNames = require('classnames');

let url
if(process.env.NODE_ENV === 'development') {
  url = 'http://localhost:8000'
}
if(process.env.NODE_ENV === 'production') {
  url = 'https://live-quiz-hackday.herokuapp.com'
}

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
      console.log(data)
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
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result.map(player => (
              <TableRow key={player.id}>
                <TableCell component="th" scope="row">{player.name}</TableCell>
                <TableCell align="right">{player.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      <Button className={classes.button} onClick={playAgain} variant="contained" size="large" color="primary">Play Again?</Button>
    </Container>
  );
}

export default Home;
