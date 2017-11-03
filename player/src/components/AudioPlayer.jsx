import React, { Component } from 'react';

import newId from '../utils/NewID';

function isLive(duration){
    //Switch is in case any browsers are idiots
    switch(duration){
        case Number.POSITIVE_INFINITY:
            return true;
            break;
        default:
            return false;
    }
}

function niceTime(totalSeconds){
    if(isLive(totalSeconds)){
        return 'LIVE';
    }else if(isNaN(totalSeconds)){
        return '00:00';
    }else{
        var hours = Math.floor(totalSeconds / 3600);
        var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
        var seconds = Math.floor(totalSeconds - (hours * 3600) - (minutes * 60));
        minutes = (minutes < 10)? '0' + minutes : minutes;
        seconds = (seconds < 10)? '0' + seconds : seconds;
        if(hours > 0){
            return hours + ':' + minutes  + ':' + seconds;
        }else{
            return minutes  + ':' + seconds;
        }
    }
}

class AudioPlayer extends Component{

    state = {volume: 3}

    constructor(props){
        super(props);
        
        this.AudioElement = new Audio(this.props.src);

        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.reload = this.reload.bind(this);
        this.isPlaying = this.isPlaying.bind(this);
        this.changeVolumeLevel = this.changeVolumeLevel.bind(this);

        this.AudioElement.addEventListener('playing', () => {
            console.log(this.AudioElement.duration);
            this.forceUpdate();
        });

        this.AudioElement.addEventListener('paused', () => {
            this.forceUpdate();
        });
    }

    play(){
        this.AudioElement.play();
        this.forceUpdate();
    }

    pause(){
        this.AudioElement.pause();
        this.forceUpdate();
    }

    reload(){
        this.AudioElement.load();
        this.AudioElement.play();
        this.forceUpdate();
    }

    isPlaying(){
        if(this.AudioElement.paused) return false;
        return true;
    }

    changeVolumeLevel(){
        var volume = this.state.volume;
        //volume = (volume >= 3)? 0 : (volume + 1);
        volume = (volume >= 3)? 0 : 3;
        this.AudioElement.volume = (volume == 0)? 0 : (1 - ((3 - volume) * 0.33));
        this.setState({volume: volume});
    }
    

    componentWillMount(){
        this.id = newId("audio");
       
    }

    componentDidMount(){
        
        if(this.props.autoplay){
            this.AudioElement.play();
        }
       
    }

    componentWillUnmount(){

    }

    render(){
        const autoplay = this.props.autoplay;

        var volume_icons = {
            0 : "volume_off",
            1 : "volume_mute",
            2 : "volume_down",
            3 : "volume_up"
        }
        var volume_icon = volume_icons[this.state.volume];

        return (
            <div className="audioplayer">
                <div className="controls">
                    <span>
                        {this.isPlaying() ? 
                            ( <i className="material-icons" onClick={this.pause} >pause_circle_outline</i>) :
                            ( <i className="material-icons" onClick={this.play} >play_circle_outline</i>)
                        }
                        <i className="material-icons float-right" onClick={this.reload}>skip_next</i>
                    </span>
                    <span>{niceTime(this.AudioElement.duration)}</span>
                    <i className="material-icons float-right" onClick={this.changeVolumeLevel}>{volume_icon}</i>
                </div>
            </div>
        );
    }
}

export default AudioPlayer;