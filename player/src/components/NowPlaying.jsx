import React, { Component } from 'react';


/* global $ */


class NowPlaying extends Component{

    state = { 
        tracks : [],
        current: {}
    };
    
    updateNowPlaying(){
    $.get('/api/public/songs/recent?limit=6&skip=1').done((response) => {
        this.setState({tracks: response});
    });

    $.get('/api/public/songs/now').done((response) => {
        this.setState({current: response});
    });
    }

    componentWillMount(){
        this.updateNowPlaying();
        this.refreshSongInterval = setInterval(this.updateNowPlaying.bind(this), 5000);
    }

    componentWillUnmount(){
        clearInterval(this.refreshSongInterval);
    }


    render(){
        var songData = this.state.current;

        var title = "";
        var artist = "";
        var image = "";
        var description ="";
        var url = "";

        try{
            if(songData.artist){
                title = songData.name;
                artist = songData.artist.name;     
                url = songData.url;
            }else{
                title = songData.raw.title;
                artist = songData.raw.artist;
            }       
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
                    {track.title} - {track.artist}
                    <span style={{float: "right"}} >{formatted}</span>
                 </li>
            )
        });

        return(
            <div className="card" >
                <div class="card-header">
                    Recent songs
                </div>
                <div className="card-body">
                    <span style={{float: "right"}} >Now</span>
                    <a href={url} target="_blank">
                        <h4 className="card-title">{title}</h4>
                        <p className="card-text">{artist}</p>
                    </a>
                </div>
                <ul className="list-group list-group-flush">
                     {listItems}
                </ul>
            </div>
        );
    }
}

export default NowPlaying;