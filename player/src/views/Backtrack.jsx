import React, { Component } from 'react';

/* global $ */

function EpisodeList(props){
    const episodes = props.episodes;
    const listItems = episodes.map((episode) => {
        return (
        <li className="list-group-item" key={episode.slug}>
            {episode.title}
        </li>
        );
    });
    return (
        <div className="card" >
        <h3 className="menu-title-3">Shows</h3>
                <ul className="list-group list-group-flush hide-md-and-down">
                    {listItems}
                </ul>
            </div>
    )
}


class Backtrack extends Component{

    state = { episodes : [] }

    getShowsList(){
        $.getJSON('/api/public/show').done((response) => {
            this.setState({episodes : response});
        });
    }

    
    componentDidMount(){
        this.getShowsList();
    }

    render(){
        return (
            <div className="">
                <EpisodeList episodes={this.state.episodes} />
            </div>
        );
    }
}

export default Backtrack;