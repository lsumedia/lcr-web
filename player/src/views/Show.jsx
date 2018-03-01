import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import defaultData from '../Variables.jsx';
import ScalableContainer from '../components/ScalableContainer';

/* global $, globals */

function ShowList(props){
    const shows = props.shows;
    const listItems = shows.map((show) => {
        var path = '/show/' + show.slug;
        return (
            <NavLink to={path} className="list-group-item" key={show.slug}>
                <div className="card-body">
                {show.title}
                </div>
            </NavLink>
        );
    });
    return (
        <ScalableContainer content={
            <div className="card">
                <h4 className="menu-title-3">Shows</h4>
                <ul className="list-group list-group-flush">
                        {listItems}
                </ul>
            </div>
        }/>
    )
}

class ShowPage extends Component{
    
    state = { 
        showmeta : {},
        episodes : []
    }

    getShowData(){
        var slug = this.props.match.params.slug;
        $.getJSON('/api/public/show/' + slug).done((response) => {
            this.setState({showmeta: response})
        });
    }

    getEpisodes(){
        var slug = this.props.match.params.slug;
        $.getJSON('/api/public/episode/byshow/' + slug).done((response) => {
            this.setState({episodes : response});
        });
    }

    componentDidMount(){
        this.getShowData();
        this.getEpisodes();
    }

    render(){
        var showData = this.state.showmeta;
        if(!showData.image) showData.image = defaultData.image;

        var episodeList = this.state.episodes.map((episode) => {
            var path = '/episode/' + episode._id;
            var episodeDate = new Date(episode.publishTime);

            var dateString = episodeDate.getDate() + "/" + (episodeDate.getMonth() + 1)+ "/" + episodeDate.getFullYear();

            var description = (episode.description.length > 40)? episode.description.substr(0,37) + '...' : episode.description;

            var playAction = (e) =>{
                globals.AudioPlayer.playEpisode(episode._id);
                e.preventDefault();
            }

            return (
                <NavLink to={path} class="list-group-item">
                    <div class="">
                        <div className="">{episode.title} {dateString}</div>
                        <i className="material-icons float-right" onClick={playAction}>play_circle_outline</i><br />
                        {description}
                    </div>
                </NavLink>
            );
        });

        return (
        <ScalableContainer content={
            <div>
                <div className="card episode-card">
                    <img className="card-img-top" src={showData.image} alt="Show Image" />
                </div>
                <div className="card-body now-playing-info">
                <h4 className="card-title">{showData.title}</h4>
                {showData.description}
                </div>
                <div className="card square-card">
                    <div className="card-body more-episodes">
                        Episodes
                    </div>
                    <ul className="list-group list-group-flush">
                        {episodeList}
                    </ul>
                </div>
               
            </div>
        }/>)
    }
}


class Show extends Component{

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
            <Switch>
                <Route path="/show/:slug" component={ShowPage} />
                <Route path="/show">
                    <ShowList shows={this.state.shows} />
                </Route>
            </Switch>
        );
    }
}

export default Show;