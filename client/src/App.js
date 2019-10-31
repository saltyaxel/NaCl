import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import './App.css'
import Home from './pages/Home/Home'
import Game from './pages/Game/Game'
import Result from './pages/Result/Result'
import io from 'socket.io-client'
const url = process.env.NODE_ENV === "development" ? 'http://localhost:8000' : 'https://live-quiz-hackday.herokuapp.com'

const App = () => {
  
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const socket = io(url)
    setSocket(socket)
  }, [])

  return (
      <Router>
          <Switch>
            
            <Route path="/play"
              render={() => <Game {...{
                socket: socket
              }}/>}/>
            />

            <Route
              path="/result"
              render={() => <Result {...{
                socket: socket
              }}/>}/>

            <Route path="/"
            render={() => <Home/>
            }/>

          </Switch>
      </Router>
  )
}

export default App
