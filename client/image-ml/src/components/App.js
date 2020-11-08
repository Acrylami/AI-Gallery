import React from 'react';
import {Switch, Route} from 'react-router-dom';
import '../App.css';
import Home from './Home';
import Function from './Function';


function App() {
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>

      <Route exact path='/image/:feature'>
        <Function />
      </Route>


    </Switch>

  );
}

export default App;
