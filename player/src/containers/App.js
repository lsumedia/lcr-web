import React, { Component } from 'react';

import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import '../assets/css/bootstrap.css';
import '../assets/css/App.css';

import Nav from '../components/Nav';
import AudioPlayer from '../components/AudioPlayer';

//Pages
import Live from '../views/Live';
import Backtrack from '../views/Backtrack';
import Schedule from '../views/Schedule'

class App extends Component {

  render() {
    return (
      <div className="App">
        
          <Nav />
          <Switch>
              <Route path="/live" component={Live}/>
              <Route path="/backtrack" component={Backtrack}/>
              <Route path="/schedule" component={Schedule}/>
              <Redirect from="/" to="/live" />
          </Switch> 

          <AudioPlayer  
            src="http://ice.lsu.co.uk:8080/lcrhigh" 
            type="audio/mpeg" 
            autoplay="false"/>
        </div>
    );
  }
}

export default App;
