import React, { Component } from 'react';
import { Switch,Route } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import HomePage from './pages/home';
import CreateEventPage from './pages/create-event';
import JoinEventPage from './pages/join-event';
import NavBar from './partials/navbar';
import PrivateRoute from './components/private-route';


import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <NavBar/>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <PrivateRoute path="/create-event" component={CreateEventPage}/>
            <Route path="/event/:id" component={JoinEventPage}/>
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
