import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

class NavMenu extends Component{
    render(){
        return(
            <div open={this.props.open} className="scroll-container modal-menu">
                <div class="">
                    <h3 className="menu-title-1">Menu</h3>
                    <NavLink to={'/'} onClick={this.props.hideMenu} className="card nav-option">
                        <div className="card-body card-menu">
                            <h4 className="card-title menu-title">Listen Live</h4>
                            <p className="menu-title-2"> Right now</p>
                        </div>
                    </NavLink>
                    <NavLink to={'/backtrack'} onClick={this.props.hideMenu} className="card nav-option">
                        <div className="card-body card-menu">
                            <h4 className="card-title menu-title">Backtrack</h4>
                            <p className="menu-title-2"> Previous shows</p>
                        </div>
                    </NavLink> 
                    <NavLink to={'/schedule'} onClick={this.props.hideMenu} className="card nav-option">
                        <div className="card-body card-menu">
                            <h4 className="card-title menu-title">Schedule</h4>
                            <p className="menu-title-2"> What's next</p>
                        </div>
                    </NavLink>
                    <NavLink to={'/login'} onClick={this.props.hideMenu} className="card nav-option">
                        <div className="card-body card-menu">
                            <h4 className="card-title menu-title">Committee Login</h4>
                        </div>
                    </NavLink>
                </div>
                
            </div>
        )
    }
}

export default NavMenu;