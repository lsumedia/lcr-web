import React, { Component } from 'react';

/* global $ */

import VideoPlayer from '../components/VideoPlayer';

import Poster from '../assets/img/lcr_splash.png';

import NowPlaying from '../components/NowPlaying';

class Live extends Component {

  state = { nowplaying : {}};

  updateNowPlaying(){
    $.get('/api/public/songs/now').done((response) => {
        this.setState({nowplaying: response});
    });
  }

  componentWillMount(){
    this.updateNowPlaying();
    this.refreshSongInterval = setInterval(this.updateNowPlaying.bind(this), 5000);
  }

  componentWillUnmount(){
    clearInterval(this.refreshSongInterval);
  }

  render() {
    var nowPlaying = this.state.nowplaying;
    return (
        <div className="container" id="live-container">
            <VideoPlayer 
              poster={Poster}
              src="http://ice.lsu.co.uk:8080/lcrhigh" 
              type="audio/mpeg" 
              autoplay="false"/>
              
              <NowPlaying track={nowPlaying} />
      </div>
    );
  }
}

export default Live;
