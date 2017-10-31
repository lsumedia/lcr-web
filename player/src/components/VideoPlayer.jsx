import React, { Component } from 'react';

import newId from '../utils/NewID';

/* global videojs */

class VideoPlayer extends Component{
    componentWillMount(){
        this.id ="video-" + newId();
    }
    componentDidMount(){
        this.video = videojs(this.id);
    }

    componentWillUnmount(){
    }

    render(){
        const autoplay = this.props.autoplay;
        return (
            <div className="embed-responsive embed-responsive-16by9">
                <video id={this.id} 
                className="video-js embed-responsive-item"
                poster={this.props.poster} 
                autoPlay={autoplay == "true" ? 1 : 0}
                controls preload="auto" width="100%" height="100%" data-setup="{}">
                    <source src={this.props.src} type={this.props.type} />
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