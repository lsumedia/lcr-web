import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import { defaultData, daysOfWeek, months } from '../Variables.jsx';
import ScalableContainer from '../components/ScalableContainer';
import { ShowList } from './Show';

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
            var dateString = episodeDate.getDate() + " " + months[episodeDate.getMonth()];

            var title = episode.title;

            return (
                <NavLink to={path} className="list-group-item episode-list-item">
                    <div className="">
                        <span className="float-left">{title}</span>
                        <span className="episode-date float-left">{dateString}</span>
                        <i className="material-icons episode-play float-right" onClick={playAction}>play_circle_outline</i>
                    </div>
                </NavLink>
            );
        });

        return (
            <div className="card square-card"> 
                <div className="lcr-list-title">Recent</div>
                <ul className="list-group list-group-flush">
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
                    <ShowList shows={this.state.shows} />
                </div>
            } />
        );
    }
}

export default Backtrack;