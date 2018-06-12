import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './BottomNav.css';

export default class BottomNav extends Component{
    
    render(){
        return(
            <div className="bottom-nav">

                <div className="button-container justify-content-space-between">
                    
                    <NavLink to={'/'} className="bottom-nav-option" activeClassName="active" exact={true}>
                        <i className="material-icons">home</i>
                    </NavLink>

                    <NavLink to={'/backtrack'} className="bottom-nav-option" activeClassName="active">
                        <i className="material-icons">queue_music</i>
                    </NavLink>

                    <NavLink to={'/message'} className="bottom-nav-option" activeClassName="active">
                        <i className="material-icons">sms</i>
                    </NavLink>

                    <NavLink to={'/schedule'} className="bottom-nav-option" activeClassName="active">
                        <i className="material-icons">event_note</i>
                    </NavLink>

                </div>

            </div>
        );
    }
}