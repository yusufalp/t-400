import React from 'react';
import { withRouter } from 'react-router-dom';

class Result extends React.Component {
  // user can start over with random question by clicking the start over button on the result page
  handleStartOver = () => {
    this.props.history.push('/')
  }
  render() {
    return (
      <div>
        <h2>Your results</h2>
        <p>You have {this.props.correct} correct questions and {this.props.incorrect} incorrect questions </p>
        <p>Your average score is {this.props.correct * 10}%</p>
        <h3>{`${this.props.correct === 10
          ? 'TERMINATOR'
          : 'GOOD JOB!'}`}</h3>
        <img className='result-img' src={`${this.props.correct === 10
          ? 'https://live.staticflickr.com/450/19869372178_6bf3dc0a10_b.jpg'
          : 'https://upload.wikimedia.org/wikipedia/commons/b/be/Arnold_Schwarzenegger_2%2C_2012.jpg'}`} alt='arnold' />
        <p>Will you be back?</p>
        <button type='submit' onClick={this.handleStartOver}>Do it again</button>
      </div>
    );
  }
}

export default withRouter(Result);