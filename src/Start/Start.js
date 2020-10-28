import React from 'react';
import { Link } from 'react-router-dom';

class Start extends React.Component {
  render() {
    return (
      <div>
        <p>Ready to start?</p>
        <Link to='/question'>Yes</Link>
        <Link to='/question'>Absolutely Yes!</Link>
      </div>
    );
  }
}

export default Start;