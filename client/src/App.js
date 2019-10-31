import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home/Home'
import Game from './pages/Game/Game'
import Result from './pages/Result/Result'

const App = () => {
  return (
      <Router>
          <Switch>
            <Route path="/play">
                <Game />
            </Route>
            <Route path="/result">
              <Result />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
      </Router>
  );
}

export default App;
