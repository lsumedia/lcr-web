import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

class NavMenu extends Component{
    render(){
        return(
            <div open={this.props.open} className="scroll-container modal-menu">
                <div class="">
                    <NavLink to={'/'} onClick={this.props.hideMenu} className="card nav-option">
                        <div className="card-body card-menu">
                            <h4 className="card-title menu-title">Listen Live</h4>
                        </div>
                    </NavLink>
                    <NavLink to={'/backtrack'} onClick={this.props.hideMenu} className="card nav-option">
                        <div className="card-body card-menu">
                            <h4 className="card-title menu-title">Shows</h4>
                        </div>
                    </NavLink> 
                    {/* <NavLink to={'/schedule'} onClick={this.props.hideMenu} className="card nav-option">
                        <div className="card-body card-menu">
                            <h4 className="card-title menu-title">Schedule</h4>
                        </div>
                    </NavLink> */}
                    <a href="/dashboard" onClick={this.props.hideMenu} className="card nav-option">
                        <div className="card-body card-menu">
                            <h4 className="card-title menu-title">Committee Login</h4>
                        </div>
                    </a>
                    <div className="separator-horizontal"></div>
                </div>
                
            </div>
        )
    }
}

export default NavMenu;