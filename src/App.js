import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home/Home';
import Question from './Question/Question';
import Results from './Results/Results';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <Switch>
          <Route
            exact path='/'
            component={Home}
          />
          <Route
            path='/question'
            component={Question}
          />
          <Route
            path='/results'
            component={Results}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
