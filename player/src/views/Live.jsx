import React, { Component } from 'react';

/* global $ */

import VideoPlayer from '../components/VideoPlayer';

import Poster from '../assets/img/lcr_splash.png';

class Live extends Component {

  state = { nowplaying : "Now Playing"};

  updateNowPlaying(){
    $.get('/api/public/nowplaying').done((response) => {
      var track = response.icestats.source.title;
          this.setState({nowplaying: track});
    });
  }

  componentDidMount(){
    this.updateNowPlaying();
    this.refreshSongInterval = setInterval(30000, this.updateNowPlaying);
  }

  componentWillUnmount(){
    clearInterval(this.refreshSongInterval);
  }

  render() {
    return (
        <div className="container" id="live-container">
            <VideoPlayer 
              poster={Poster}
              src="http://ice.lsu.co.uk:8080/lcrhigh" 
              type="audio/mpeg" 
              autoplay="false"/>
              
              <div className="card">
              <div className="card-body">
                <h4 className="card-title">{this.state.nowplaying}</h4>
              </div>
              </div>
      </div>
    );
  }
}

export default Live;
