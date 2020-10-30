import React from 'react';

class Home extends React.Component {
  handleStart = () => {
    this.props.history.push('/trivia');
  }
  render() {
    return (
      <div className='title'>
        <h1>Welcome to T-400</h1>
        <h2>where we are going to test your limits and endurance.</h2>
        <div className='content'>
          <p>JK, this is just a game</p>
          <p>if you get all 10 questions correct though, you will be called 'Terminator'... of this trivia game :)</p>
          <p>Ready to start?</p>
        </div>
        <button type='submit' onClick={this.handleStart}>Yes</button>
        <button type='submit' onClick={this.handleStart}>Absolutely Yes!</button>
      </div>
    );
  }
}

export default Home;