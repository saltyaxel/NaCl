import React from 'react';
import './Home.css';
import Container from '@material-ui/core/Container';
import GameCard from '../../components/GameCard/GameCard'

function Home() {

  return (
    <div>
      <Container maxWidth="lg">
      <h1>NaCl Quiz Game! Choose a game to get started!</h1>
      <div className="games-container">
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
      </div>
      <div>
        <p>Connected people</p>
        <ul>
          <li>Sasha</li>
          <li>Axel</li>
          <li>Victor</li>
        </ul>
      </div>
      </Container>
    </div>
  );
}

export default Home;
