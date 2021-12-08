import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import MainFood from './pages/MainFood';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ MainFood } />
      </Switch>
    </div>
  );
}

export default App;
