import React, { Component } from 'react';

import newId from '../utils/NewID';

import '../assets/css/AudioPlayer.css';

import { defaultData } from '../Variables.jsx';

/* global $, globals */

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


    streams = [
        {
            "url" : "http://ice.lsu.co.uk:8080/lcrhigh",
            "type" : "audio/mpeg",
            "title" : "LCR Live"
        },
        {
            "url" : "http://ice.lsu.co.uk:8080/lcr2",
            "type" : "audio/mpeg",
            "title" : "LCR Sustain"
        }
    ]

    state = {
        volume: 3,
        showInfo : false,
        mode : 0,
        episodeID: null,
        episode : {},
        stream : 0
    }

    constructor(props){
        super(props);
        
        globals.AudioPlayer = this;

        this.AudioElement = new Audio();

        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.reload = this.reload.bind(this);
        this.isPlaying = this.isPlaying.bind(this);
        this.changeVolumeLevel = this.changeVolumeLevel.bind(this);
        this.toggleInfoBar = this.toggleInfoBar.bind(this);
        this.goLive = this.goLive.bind(this);

        this.AudioElement.addEventListener('playing', () => {
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

    playEpisode(id){
        
        this.setState({
            mode : 1,
            episodeID : id
        }, () => {
            this.loadAudioFile(true);
        });

    }
    
    goLive(){

        this.setState({
            mode : 0,
            episodeID : null
        }, () => {
            this.loadAudioFile(true);
        });

    }

    loadAudioFile(play){
        var _this = this;
        if(_this.state.mode == 0){
            console.log("Load live");
            var stream = this.streams[this.state.stream];
            _this.AudioElement.src = stream.url;
            _this.AudioElement.type = stream.type;
            _this.AudioElement.load();
            if(play) this.AudioElement.play();
        }else{
            $.getJSON('/api/public/episode/' + this.state.episodeID).done(function(response){
                console.log("Load episode " + _this.state.episodeID);
                _this.setState({episode : response});
                
                var source = _this.state.episode.meta.media_url[0];
                _this.AudioElement.src = source.url;
                _this.AudioElement.type = source.type;
                _this.AudioElement.load();
                if(play) _this.AudioElement.play();
            });
        }
    }

    isPlaying(){
        if(this.AudioElement.paused) return false;
        return true;
    }

    toggleInfoBar(){
        var info = (this.state.showInfo)? false : true;
        this.setState({showInfo : info});
    }

    changeVolumeLevel(){
        var volume = this.state.volume;
        //volume = (volume >= 3)? 0 : (volume + 1);
        volume = (volume >= 3)? 0 : 3;
        this.AudioElement.volume = (volume == 0)? 0 : (1 - ((3 - volume) * 0.33));
        this.setState({volume: volume});
    }
    

    getContentDetails(){
        
        if(this.state.mode == 1){
            
            return this.state.episode;
        }else{
            return defaultData;
        }

    }

    componentWillMount(){
        this.id = newId("audio");
    }

    componentDidMount(){
        this.loadAudioFile(this.props.autoplay);
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

        var showInfo = this.state.showInfo;
        var menu_icon = (this.state.showInfo)? "keyboard_arrow_down" : "keyboard_arrow_up";

        

        try{
            var details = this.getContentDetails();
            var title = details.title;
            var shortTitle = (title.length > 16)? title.substr(0,13) + '...' : title;
        }catch(e){
            title = "";
            shortTitle = "";
        }


        return (
            <div>
                <div className="audioplayer" open={showInfo}>
                    <div className="controls">
                        <span>
                            {this.isPlaying() ? 
                                ( <i className="material-icons" onClick={this.pause} >pause_circle_outline</i>) :
                                ( <i className="material-icons" onClick={this.play} >play_circle_outline</i>)
                            }
                        </span>
                        {/*<span>{niceTime(this.AudioElement.duration)}</span> */}
                        <span className="audioplayer-summary" onClick={this.toggleInfoBar}>
                            {shortTitle}
                            <i className="material-icons float-right">{menu_icon}</i>
                        </span>
                        <span>
                            <i className="material-icons float-right" onClick={this.changeVolumeLevel}>{volume_icon}</i>
                        </span>
                    </div>
                </div>
                <div className="audioplayer-extra ad" open={showInfo}>
                    <div className="audioplayer-extra-title">
                        <h4>{title}</h4>
                        {details.description}
                    </div>
                    <p class="audioplayer-additional-controls">
                        <button className="btn btn-flat" onClick={this.goLive}>Back to LCR Live</button>
                        <i className="material-icons float-right" onClick={this.reload}>skip_next</i>
                    </p>
                </div>
                <div className="audioplayer-extra-mask ad" open={showInfo}>
                </div>
            </div>
        );
    }
}

export default AudioPlayer;