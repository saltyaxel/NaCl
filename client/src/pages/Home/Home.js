import React, { useState } from 'react';
import './Style.css';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
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
  let history = useHistory()
  const [name, setName] = useState()

  const joinGame = (e) => {
    // This needs to be restructured
    e.preventDefault()
    localStorage.setItem('name', name);
    history.push('/play')
  }

  return (
    <Container className={classes.container} maxWidth="lg">
      <form className="form" onSubmit={joinGame} noValidate autoComplete="off">
        <Typography className={classes.header} variant="h5">
          Welcome to Live Quiz! Please enter your name to join the game
        </Typography>
        <div className="wrapper-input-and-button">
        <TextField
          id="name"
          label="Name"
          margin="normal"
          variant="outlined"
          onChange={(event) => {setName(event.target.value)}}
        />
        <Button className={classes.button} variant="contained" color="primary" size="large" type="submit">Join Game</Button>
        </div>
      </form>
    </Container>
  );
}

export default Home;
