import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import defaultData, { months } from '../Variables.jsx';
import ScalableContainer from '../components/ScalableContainer';

/* global $, globals */

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
        <div className="card square-card">
            <div className="lcr-list-title">All shows</div>
            <ul className="list-group list-group-flush">
                    {listItems}
            </ul>
        </div>
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

        var numEpisodes = this.state.episodes.length;

        var episodeList = this.state.episodes.map((episode, index) => {
            var path = '/episode/' + episode._id;
            var episodeDate = new Date(episode.publishTime);

            var dateString = months[episodeDate.getMonth()] + " " + episodeDate.getDate();

            var description = (episode.description.length > 40)? episode.description.substr(0,37) + '...' : episode.description;

            var playAction = (e) =>{
                globals.AudioPlayer.playEpisode(episode._id);
                e.preventDefault();
            }

            var title = episode.title;

            if(title == showData.title) title = "Episode " + (numEpisodes - index);

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
                    {/* <div className="card-body more-episodes">
                        Episodes
                    </div> */}
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

export { ShowList }