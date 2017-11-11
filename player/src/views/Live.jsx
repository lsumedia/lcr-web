import React, { Component } from 'react';


import VideoPlayer from '../components/VideoPlayer';

import Poster from '../assets/img/lcr_splash.png';

import NowPlaying from '../components/NowPlaying';

class Live extends Component {

  

  render() {
    return (
        <div className="container-fluid" id="live-container">
          <div className="row">
              <div class="col-sm-12 col-lg-8 col-xl-7 offset-xl-2">
                <div className="card">
                  <img className="card-img-top" src={Poster} alt="Card image cap" />
                  <div className="card-body">
                    <h4 className="card-title">LCR Live</h4>
                    Your Soundtrack to Loughborough
                  </div>
                </div>
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
