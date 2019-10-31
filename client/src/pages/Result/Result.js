import React, { useState, useEffect } from 'react';
import './Style.css';
import Container from '@material-ui/core/Container';
import { Button, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    height: "100%"
  },
  header: {
    fontWeight: "lighter"
  },
  button: {
    marginLeft: "1rem"
  }
}))

const Home = () => {
  const classes = useStyles()

  const [result, setResult] = useState([])

  useEffect(() => {
    const getResult = async () => {
      const res = await fetch('http://localhost/result')
      const data = await res.json()
      console.log(data)
      setResult(data)
    }
    
    getResult()

  }, [])

  return (
    <Container className={classes.container} maxWidth="lg">
      <Typography variant="h4">And the winner is...</Typography>
      <Button variant="contained" color="primary">Play Again</Button>
      { result.map(player => <li>{player.name} - Points: {player.points}</li>)}
    </Container>
  );
}

export default Home;
