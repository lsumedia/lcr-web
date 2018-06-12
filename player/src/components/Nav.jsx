import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../assets/img/lcr_white_square.png';

class Nav extends Component{
    render(){
        return(
        <nav className="navbar navbar-lcr text-align-center">
           
            <NavLink to={'/'} className="navbar-brand" activeClassName="active"  onClick={this.props.hideMenu}>
                <img src={logo} width="40" height="40" alt="" className=""/>
            </NavLink>
           
        </nav>
        )
    }
}

export default Nav;