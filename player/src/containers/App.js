import React, { Component } from 'react';

import '../assets/css/bootstrap.css';
import '../assets/css/App.css';

import logo from '../assets/img/lcr_facebook.png';

import VideoPlayer from '../components/VideoPlayer';

class App extends Component {
  render() {
    return (
      <div className="App">
        
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="#">
            <img src={logo} width="40" height="40" alt="" className=""/>
          </a>

          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link active" href="#">Live</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Backtrack</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Schedule</a>
            </li>
          </ul>
        </nav>
        <div className="container">
            <VideoPlayer />
        </div>
      </div>
    );
  }
}

export default App;
