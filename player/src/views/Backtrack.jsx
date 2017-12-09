import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import defaultData from '../Variables.jsx';

/* global $, globals*/

function ShowList(props){
    const shows = props.shows;
    const listItems = shows.map((show) => {
        var path = '/show/' + show.slug;
        return (
            <NavLink to={path} className="list-group-item" key={show.slug}>
                {show.title}
            </NavLink>
        );
    });
    return (
        <div className="card" >
        <h3 className="menu-title-3">Shows</h3>
                <ul className="list-group list-group-flush">
                    {listItems}
                </ul>
            </div>
    )
}

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
                <NavLink to={path} className="list-group-item" key={episode._id}>
                    {episode.title}
                    <i className="material-icons float-right" onClick={playAction}>play_circle_outline</i><br />
                </NavLink>
            );
        });

        return (
            <div className="card">
                <h4 className="menu-title-3">Recent</h4>
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
            <div className="">
                <Recent />
                <div className="card">
                    <NavLink to="/show">
                        <h4 className="menu-title-3 card-title">All Shows</h4>
                    </NavLink>
                </div>
            </div>
        );
    }
}

export default Backtrack;