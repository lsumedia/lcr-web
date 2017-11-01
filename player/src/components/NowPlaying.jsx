import React, { Component } from 'react';


class NowPlaying extends Component{

    render(){
        var songData = this.props.track;

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

        return(
            <div className="card">
                <div className="card-body">
                    <a href={url} target="_blank">
                        <h4 className="card-title">{title}</h4>
                        <h5 className="card-subtitle">{artist}</h5>
                    </a>
                </div>
            </div>
        )
    }
}

export default NowPlaying;