import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Home from './components/core/Home';
import AddMovie from './components/core/AddMovie';
function App() {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/add-movie' component={AddMovie} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
