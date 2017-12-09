import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import defaultData from '../Variables.jsx';

/* global $, globals*/


class Featured extends Component{

}

class Recent extends Component{
    
    state = {
        episodes : []
    }

    getEpisodes(){
        $.getJSON('/api/public/episode?limit=5').done((response) => {
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
            return (
                <NavLink to={path} className="card episode-list-card" key={episode._id}>
                    <div className="card-body">
                        {episode.title}
                        <i className="material-icons float-right" onClick={playAction}>play_circle_outline</i>
                    </div>
                </NavLink>
            );
        });

        return (
            <div className="card">
                <h4 className="menu-title-3">Recent</h4>
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
            <div className="">
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