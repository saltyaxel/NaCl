import React, { useEffect } from 'react';
import './Game.css';
import io from 'socket.io-client'
import Container from '@material-ui/core/Container';

function Game() {

  // useEffect(() => {
  //   const socket = io('http://localhost')
  //   socket.on('connect', () => {
  //     console.log("I've connected!")
  //     socket.emit('test', {
  //       name: "Axel"
  //     })
  //   })
  //   socket.on('event', (data) => {
  //     console.log(`Here comes data: ${data}`)
  //   })
  //   return () => {
  //     // Close every event on every event listener
  //     // socket.off('connect')
  //     // socket.close()
  //   }
  // }, [])

  return (
    <div>
      <Container maxWidth="lg">
        <h1>What is the chemical compound of salt?</h1>
        <ol>
          <li>H2O</li>
          <li>NaCl</li>
          <li>FO4</li>
          <li>CO2</li>
        </ol>
      </Container>
    </div>
  );
}

export default Game;
