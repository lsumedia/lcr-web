import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import { defaultData, daysOfWeek, months } from '../Variables.jsx';
import ScalableContainer from '../components/ScalableContainer';

/* global $, globals*/



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
                <NavLink to={path} className="list-group-item" key={episode._id}> 
                    <div className="card-body">
                        {episode.title} <span className="text-grey">{dateString}</span>
                        <i className="material-icons float-right" onClick={playAction}>play_circle_outline</i>
                    </div>
                </NavLink>
            );
        });

        return (
            <div className="card square-card"> 
                <h4 className="menu-title-3">Recent</h4>
                <ul class="list-group list-group-flush">
                    {listItems}
                </ul>
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
            <ScalableContainer content={
                <div>
                    <Recent />
                    <div className="card square-card">
                        <NavLink to="/show">
                            <h4 className="menu-title-3 card-title">All Shows</h4>
                        </NavLink>
                    </div>
                </div>
            } />
        );
    }
}

export default Backtrack;