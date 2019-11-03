import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import './App.css'
import Home from './pages/Home/Home'
import Game from './pages/Game/Game'
import Result from './pages/Result/Result'
import io from 'socket.io-client'
import { StateProvider } from './state'
const url = process.env.NODE_ENV === "development" ? 'http://localhost:8000' : 'https://live-quiz-hackday.herokuapp.com'

const App = () => {

  const initialState = {
    socket: io(url),
    name: localStorage.getItem('name') ? localStorage.getItem('name') : ''
  };
  
  const reducer = (state, action) => {
    switch (action.type) {
      case 'changeName':
        return {
          ...state,
          name: action.newName
        };
        
      default:
        return state;
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Router>
          <Switch>
            <Route path="/play">
              <Game/>
            </Route>

            <Route path="/result">
              <Result/>
            </Route>

            <Route path="/">
              <Home/>
            </Route>
          </Switch>
      </Router>
    </StateProvider>
  )
}

export default App
