import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../assets/img/lcr_facebook.png';

class Nav extends Component{
    render(){
        return(
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="/">
            <img src={logo} width="40" height="40" alt="" className=""/>
          </a>

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
          </ul>
        </nav>
        )
    }
}

export default Nav;