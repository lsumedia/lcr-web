import React, { Component } from 'react';

import {NavLink} from 'react-router-dom';

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
        this.forward20 = this.forward20.bind(this);
        this.back20 = this.back20.bind(this);
        this.reload = this.reload.bind(this);
        this.isPlaying = this.isPlaying.bind(this);
        this.changeVolumeLevel = this.changeVolumeLevel.bind(this);
        this.toggleInfoBar = this.toggleInfoBar.bind(this);
        this.hideInfoBar = this.hideInfoBar.bind(this);
        this.goLive = this.goLive.bind(this);
        this.updatePageTitle = this.updatePageTitle.bind(this);

        this.AudioElement.addEventListener('timeupdate', () => {
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

    forward20(){
        this.AudioElement.currentTime += 20;
    }

    back20(){
        this.AudioElement.currentTime -= 20;
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

    hideInfoBar(){
        this.setState({showInfo : false});
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

    updatePageTitle(){

        var prefix = "LCR";

        if(this.state.mode == 0){
            $.getJSON('/api/public/songs/now').done(function(response){
                document.title = prefix + ' - ' + response.raw.title + ' by ' + response.raw.artist;
            });
        }else{
            document.title = prefix + ' - ' + this.state.episode.title;
        }

    }

    componentWillMount(){
        this.id = newId("audio");
    }

    componentDidMount(){
        this.loadAudioFile(this.props.autoplay);
        this.updatePageTitle();
        this.updateTitleInterval = setInterval( this.updatePageTitle, 5000);
    }

    componentWillUnmount(){
        clearInterval(this.updateTitleInterval);
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

        var details, title, shortTitle, currentTime, duration;

        try{
            details = this.getContentDetails();
            title = details.title;
            shortTitle = (title.length > 16)? title.substr(0,13) + '...' : title;

            currentTime = niceTime(this.AudioElement.currentTime);
            duration = niceTime(this.AudioElement.duration);

        }catch(e){
            title = "";
            shortTitle = "";
        }

        return (
            <div>
                <div className="audioplayer" open={showInfo}>
                    <div className="controls audioplayer-controls">
                        <span>
                            {this.isPlaying() ? 
                                ( <i className="material-icons" onClick={this.pause} >pause_circle_outline</i>) :
                                ( <i className="material-icons" onClick={this.play} >play_circle_outline</i>)
                            }
                        </span>
                        {/*<span>{niceTime(this.AudioElement.duration)}</span> */}
                        <span className="audioplayer-summary" onClick={this.toggleInfoBar}>
                            {shortTitle}
                        </span>
                        <span>
                            <i className="material-icons float-right" onClick={this.changeVolumeLevel}>{volume_icon}</i>
                        </span>
                        {(this.state.mode == 1)? (
                        <div className="audioplayer-controls-background-image" style={{backgroundImage : "url('" + details.image + "')"}}>
                        </div>
                        ) : ""
                        }
                    </div>
                </div>
                <div className="audioplayer-extra ad" open={showInfo}>
                    <div className="audioplayer-extra-menu">
                            <span>
                                <i className="material-icons invisible">close</i>
                            </span>
                            <span>Player</span>
                            <span>
                                <i onClick={this.hideInfoBar} className="material-icons">close</i>
                            </span>
                    </div>
                    <div className="audioplayer-extra-title">
                        <h4>{title}</h4>
                        {details.description}
                    </div>
                    {(this.state.mode == 0)? (
                        //Live content controls
                        <div>
                            <p class="audioplayer-additional-controls">
                            </p>
                            <div class="audioplayer-nav-buttons">
                                <button className="btn" onClick={this.reload}>Reload Stream</button>
                                <NavLink to="/" className="btn" onClick={this.hideInfoBar}>More Info</NavLink>
                            </div>
                        </div>
                    ) : (
                        //OD content controls
                        <div>
                            <div class="audioplayer-additional-controls">
                                <div className="audioplayer-control-buttons">
                                    <i className="material-icons" onClick={this.back20}>skip_previous</i>
                                    {this.isPlaying() ? 
                                        ( <i className="material-icons" onClick={this.pause} >pause_circle_outline</i>) :
                                        ( <i className="material-icons" onClick={this.play} >play_circle_outline</i>)
                                    }
                                    <i className="material-icons" onClick={this.forward20}>skip_next</i>
                                </div>
                                <div className="audioplayer-seek-controls">
                                    <span>{currentTime}</span>
                                    <input className="control-item seekbar" type="range" min="0" 
                                        max="500"
                                        value={(this.AudioElement.currentTime / this.AudioElement.duration) * 500} 
                                        onChange={(evt) => { 
                                            var value = evt.target.value;
                                            var time = (value / 500) * this.AudioElement.duration;
                                            this.AudioElement.currentTime = time;
                                        }}></input>
                                    <span>{duration}</span>
                                </div>
                            </div>
                            <div class="audioplayer-nav-buttons">
                                <NavLink to={('/episode/' + this.state.episodeID)} className="btn" onClick={this.hideInfoBar}>More Info</NavLink>
                                <button className="btn" onClick={this.goLive}>BACK TO LIVE</button>
                            </div>
                        </div>
                    )}

                    <div className="audioplayer-background-image" style={{backgroundImage : "url('" + details.image + "')"}}>
                    </div>
                </div>
                <div className="audioplayer-extra-mask ad" onClick={this.hideInfoBar} open={showInfo}>
                </div>
            </div>
        );
    }
}

export default AudioPlayer;