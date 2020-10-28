import React from 'react';
import Start from '../Start/Start';

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to T-400</h1>
        <h2>where we are going to test your limits and endurance. JK, this is just a game</h2>
        <p>if you get all 10 questions correct though, you will be called 'Terminator'... of this trivia game :)</p>
        <Start />
      </div>
    );
  }
}

export default Home;