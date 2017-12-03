import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import defaultData from '../Variables.jsx';

//import * as videojs from 'video.js';
/* global $, videojs */

class Episode extends Component{
    
    state = {
        episodeData : {
            meta : {
                media_url : []
            }
        }
    }

    getEpisodeData(){
        var id = this.props.match.params.id;
        console.log("ID IS: " + this.props.match.params.id);
        $.getJSON('/api/public/episode/' + id).done((response) => {
            this.setState({episodeData : response});
        });
    }

    componentDidMount(){
        this.getEpisodeData();
    }

    render(){

        var episodeData = this.state.episodeData;
        if(!episodeData.image) episodeData.image = defaultData.image;

        var showPath = '/backtrack/' + episodeData.showSlug;

        var sources = this.state.episodeData.meta.media_url.map((source) => {
            return (
                <source src={source.url} type={source.type} quality={source.quality} />
            )
        });

        return (
        <div className="" id="live-container">
          <div className="row">
              <div class="col-sm-12 col-lg-8 col-xl-7 offset-xl-2">
                <div className="card">
                  <video controls poster={episodeData.image} className="card-img-top">
                      {sources}
                  </video>
                </div>
                <div className="card-body now-playing-info">
                  <h4 className="card-title">{episodeData.title}</h4>
                  {episodeData.description}
                  <br />
                    {(episodeData.showSlug)? (
                        <NavLink to={showPath}>
                            More episodes
                        </NavLink>
                    ): null }
                </div>
                </div>
                <ul className="list-group list-group-flush">
                </ul>
            </div> 
        </div>)
    }
}

export default Episode;