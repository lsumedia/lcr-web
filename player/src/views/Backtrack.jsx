import React, { Component } from 'react';

/* global $ */


function EpisodeList(props){
    const episodes = props.episodes;
    const listItems = episodes.map((episode) => {
        return (
        <li key={episode.slug}>
            {episode.title}
        </li>
        );
    });
    return (
        <ul>{listItems}</ul>
    )
}


class Backtrack extends Component{

    state = { episodes : [] }

    getShowsList(){
        $.getJSON('/api/public/show/all').done((response) => {
            this.setState({episodes : response});
        });
    }

    
    componentDidMount(){
        this.getShowsList();
    }

    render(){
        return (
            <div className="container">
                <h4>Backtrack</h4>
                <EpisodeList episodes={this.state.episodes} />
            </div>
        );
    }
}

export default Backtrack;