import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../assets/img/lcr_white_square.png';

class Nav extends Component{
    render(){
        return(
        <nav className="navbar navbar-lcr justify-content-center">
            <NavLink to={'/'} className="navbar-brand" activeClassName="active" style={{margin : "0px"}}>
                <img src={logo} width="40" height="40" alt="" className=""/>
            </NavLink>

            {/*
          <ul className="nav">
            <NavLink to={'/'} className="nav-link" activeClassName="active">
                <p>Live</p>
            </NavLink>
            <NavLink to={'/backtrack'} className="nav-link" activeClassName="active">
                <p>Backtrack</p>
            </NavLink>
            <NavLink to={'/schedule'} className="nav-link" activeClassName="active">
                <p>Schedule</p>
            </NavLink>
          </ul> */}
        </nav>
        )
    }
}

export default Nav;