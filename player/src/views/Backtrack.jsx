import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import { defaultData, daysOfWeek, months } from '../Variables.jsx';

/* global $, globals*/


class Featured extends Component{

}

class Recent extends Component{
    
    state = {
        episodes : []
    }

    getEpisodes(){
        $.getJSON('/api/public/episode?limit=8').done((response) => {
            this.setState({episodes : response});
        });
    }

    componentWillMount(){
        this.getEpisodes();
    }

    render(){

        var episodes = this.state.episodes;

        var listItems = episodes.map((episode) => {
            var path = '/episode/' + episode._id;
            var playAction = (e) =>{
                globals.AudioPlayer.playEpisode(episode._id);
                e.preventDefault();
            }
            var episodeDate = new Date(episode.publishTime);
            var dateString =  episodeDate.getDate() + " " + months[episodeDate.getMonth()] + " " + episodeDate.getFullYear();
            return (
                <NavLink to={path} className="card episode-list-card" key={episode._id}>
                    <div className="card-body">
                        {episode.title} <span className="text-grey">{dateString}</span>
                        <i className="material-icons float-right" onClick={playAction}>play_circle_outline</i>
                    </div>
                </NavLink>
            );
        });

        return (
            <div> 
                <div className="card episode-list-card">
                    <h4 className="menu-title-3">Recent</h4>
                </div>
                {listItems}
            </div>
        );
    }
}

class Backtrack extends Component{

    state = { shows : [] }

    getShowsList(){
        $.getJSON('/api/public/show').done((response) => {
            this.setState({shows : response});
        });
    }

    
    componentDidMount(){
        this.getShowsList();
    }

    render(){
        return (
            <div className="container live-container">
                <Recent />
                <div className="card episode-list-card">
                    <NavLink to="/show">
                        <h4 className="menu-title-3 card-title">All Shows</h4>
                    </NavLink>
                </div>
            </div>
        );
    }
}

export default Backtrack;