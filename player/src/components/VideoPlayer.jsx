import React, { Component } from 'react';

//import * as videojs from 'video.js';

class VideoPlayer extends Component{
    render(){
        return (
            <div className="embed-responsive embed-responsive-16by9">
                <video id="my-video" className="video-js embed-responsive-item" controls preload="auto" width="100%" height="100%" poster="http://media.lsu.co.uk/wp-content/uploads/2016/09/LCRVideo.png" autoPlay="true" data-setup="{}">
                    <source src="http://ice.lsu.co.uk:8080/lcrhigh" type='audio/mpeg' />
                    <p className="vjs-no-js">
                        To view this video please enable JavaScript, and consider upgrading to a web browser that
                        <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
                    </p>
                </video>
            </div>
        );
    }
}

export default VideoPlayer;