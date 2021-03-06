import React, { Component } from 'react';


/* global $ */

import audiotrack from '../assets/img/ic_radio_black_24px.svg';


class NowPlaying extends Component{

    state = { 
        tracks : [],
        current: {}
    };
    
    updateNowPlaying(){
    $.get('/api/public/songs/recent?limit=4&skip=1').done((response) => {
        this.setState({tracks: response});
    });

    $.get('/api/public/songs/now').done((response) => {
        this.setState({current: response});
    });
    }

    componentWillMount(){
        this.updateNowPlaying();
        this.refreshSongInterval = setInterval(this.updateNowPlaying.bind(this), 10000);
    }

    componentWillUnmount(){
        clearInterval(this.refreshSongInterval);
    }


    render(){
        var songData = this.state.current;

        var title = "";
        var artist = "";
        var image = audiotrack;
        var description ="";
        var url = "";

        try{

            if(songData.genius){
                title = songData.genius.full_title;
                artist = songData.genius.primary_artist.name;
                image = songData.genius.song_art_image_thumbnail_url;
                url = songData.genius.url;
            }

            title = songData.raw.title;
            artist = songData.raw.artist;     

        }catch(e){
            console.error(e);
        }

        var listItems = this.state.tracks.map((track) => {
            
            var date = new Date(track.timestamp);
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            var formatted = hours + ':' + minutes.substr(-2);

            return (
                <li class="list-group-item">
                    <span style={{float: "right"}} >{formatted}</span>
                    <div className="text-left">
                        {track.title}<br />
                        {track.artist}
                    </div>
                 </li>
            )
        });

        return(
            <div className="card" >
                {/* <div class="card-header">
                    Recent songs
                </div> */}
                <div className="card-body current-song-card">
                    {/* <span style={{float: "right"}} >Now</span> --> */}
                    <div class="media current-song">
                        <img class="mr-3" src={image} width="64" height="64" />
                        <div class="media-body text-left">
                            <a href={url} target="_blank">
                                <h5 class="mt-0">{title}</h5>
                                {artist}
                            </a>
                        </div>
                    </div>
                </div>
                <ul className="list-group list-group-flush hide-md-and-down">
                    {listItems}
                </ul>
            </div>
        );
    }
}

export default NowPlaying;