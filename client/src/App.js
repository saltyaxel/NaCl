import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import io from 'socket.io-client'
import Home from './pages/Home/Home'
import Game from './pages/Game/Game'
// import Container from '@material-ui/core/Container';

function App() {
  // UseEffect because otherwise the socket connection keeps re-connecting
  // Create state so the socket can be used outside the useEffect

  useEffect(() => {
    const socket = io('http://localhost')
    socket.on('connect', () => {
      console.log("I've connected!")
      socket.emit('test', {
        name: "Axel"
      })
    })
    socket.on('event', (data) => {
      console.log(`Here comes data: ${data}`)
    })
    return () => {
      // Close every event on every event listener
      // socket.off('connect')
      // socket.close()
    }
  }, [])

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/game">Game</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/game">
            <Game />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
