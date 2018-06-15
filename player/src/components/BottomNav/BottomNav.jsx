import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './BottomNav.css';

const isBrowsing = (match, location) => {
    console.log(location);
    if(location.pathname.indexOf('backtrack') != -1) return true;
    if(location.pathname.indexOf('episode') != -1) return true;
    if(location.pathname.indexOf('show') != -1) return true;
}

export default class BottomNav extends Component{
    
    render(){
        return(
            <div className="bottom-nav">

                <div className="button-container justify-content-space-between">
                    
                    <NavLink to={'/'} className="bottom-nav-option" activeClassName="active" exact={true}>
                        <i className="material-icons">home</i>
                    </NavLink>

                    <NavLink to={'/backtrack'} className="bottom-nav-option" isActive={isBrowsing} activeClassName="active">
                        <i className="material-icons">queue_music</i>
                    </NavLink>

                    <NavLink to={'/search'} className="bottom-nav-option" activeClassName="active">
                        <i className="material-icons">search</i>
                    </NavLink>

                    <NavLink to={'/schedule'} className="bottom-nav-option" activeClassName="active">
                        <i className="material-icons">event_note</i>
                    </NavLink>

                    <NavLink to={'/message'} className="bottom-nav-option" activeClassName="active">
                        <i className="material-icons">sms</i>
                    </NavLink>


                </div>

            </div>
        );
    }
}