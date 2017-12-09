import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import defaultData from '../Variables.jsx';

/* global $ */

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
                <ul className="list-group list-group-flush hide-md-and-down">
                    {listItems}
                </ul>
            </div>
    )
}

class Featured extends Component{

}

class Recent extends Component{
    
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
                <Switch>
                    <Route path="/backtrack">
                        <ShowList shows={this.state.shows} />
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default Backtrack;