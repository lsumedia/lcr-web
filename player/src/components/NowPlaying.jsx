import React, { Component } from 'react';


class NowPlaying extends Component{


    componentDidMount(){
        /*$.get('/api/public/nowplaying').done((response) => {
            var track = response.icestats.source.title;
            $('nowplaying').html(track);
        });*/
    }

    render(){
        return(
            <div id="panel">
                <div id="nowplaying"></div>
            </div>
        )
    }
}

export default NowPlaying;