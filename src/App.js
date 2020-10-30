import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home/Home';
import Trivia from './Trivia/Trivia';
import Page404 from './Page404/Page404';

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
            path='/trivia'
            component={Trivia}
          />
          <Route
            component={Page404}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
