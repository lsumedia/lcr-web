import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

class NavMenu extends Component{
    render(){
        return(
            <div open={this.props.open} className="scroll-container modal-menu bg-dark text-white">
                <div class="container">
                    <h3>Menu</h3>
                    <NavLink to={'/'} onClick={this.props.hideMenu} className="card nav-option">
                        <div className="card-body">
                            <h4 className="card-title">Listen Live</h4>
                            Right now
                        </div>
                    </NavLink>
                    <NavLink to={'/backtrack'} onClick={this.props.hideMenu} className="card nav-option">
                        <div className="card-body">
                            <h4 className="card-title">Backtrack</h4>
                            Previous shows 
                        </div>
                    </NavLink> 
                    <NavLink to={'/schedule'} onClick={this.props.hideMenu} className="card nav-option">
                        <div className="card-body">
                            <h4 className="card-title">Schedule</h4>
                            What's next
                        </div>
                    </NavLink>
                </div>
                
            </div>
        )
    }
}

export default NavMenu;