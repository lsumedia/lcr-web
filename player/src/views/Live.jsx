import React, { Component } from 'react';

/* global $ */

import VideoPlayer from '../components/VideoPlayer';

import Poster from '../assets/img/lcr_splash.png';

import NowPlaying from '../components/NowPlaying';

class Live extends Component {

  

  render() {
    return (
        <div className="container-fluid" id="live-container">
          <div className="row">
              <div class="col-sm-12 col-lg-8 col-xl-7 offset-xl-2">
                <VideoPlayer 
                  poster={Poster}
                  src="http://ice.lsu.co.uk:8080/lcrhigh" 
                  type="audio/mpeg" 
                  autoplay="false"/>
              </div>
              <div class="col-sm-12 col-lg-4 col-xl-3">
                <NowPlaying />
              </div>
          </div> 
      </div>
    );
  }
}

export default Live;
