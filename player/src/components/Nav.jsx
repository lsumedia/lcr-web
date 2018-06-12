import React, {Component} from 'react';
import {
    Route,
    Switch,
    Redirect,
    NavLink
} from 'react-router-dom';

import logo from '../assets/img/lcr_white_square.png';

function logojsx(){
    return (
        <NavLink to={'/'} className="" activeClassName="active">
            <img src={logo} width="40" height="40" alt="" className=""/>
        </NavLink>
    );
}

class Nav extends Component{
    render(){
        return(
        <nav className="navbar navbar-lcr text-align-center">
           
            
            <Switch>
                <div className="navbar-brand">
                    
                    <Route path={'/backtrack'} render={() => <span>Browse</span>} />
                    <Route path={'/show'} render={() => <span>Browse</span>} />
                    <Route path={'/episode'} render={() => <span>Browse</span>} />
                    <Route path={'/message'} render={() => <span>Message</span>} />
                    <Route path={'/schedule'} render={() => <span>Schedule</span>} />

                    <Route exact path='/' component={logojsx} />
                </div>
            </Switch>
           
        </nav>
        )
    }
}

export default Nav;