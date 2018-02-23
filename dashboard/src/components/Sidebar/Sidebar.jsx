import React, {Component} from 'react';
import { } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import HeaderLinks from '../Header/HeaderLinks.jsx';

import imagine from '../../assets/img/faders.jpg';
import logo from '../../assets/img/lcr_white.png';

class Sidebar extends Component{
    constructor(props){
        super(props);
        this.state = {
            width: window.innerWidth
        }
    }
    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
    }
    updateDimensions(){
        this.setState({width:window.innerWidth});
    }
    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }
    render(){
        const sidebarBackground = {
            backgroundImage: 'url(' + imagine + ')'
        };
        return (
            <div id="sidebar" className="sidebar" data-color="black" data-image={imagine}>
                <div className="sidebar-background" style={sidebarBackground}></div>
                    <div className="logo">
                        <a href="/" className="simple-text logo-mini">
                            <div className="logo-img">
                                <img src={logo} alt="logo_image"/>
                            </div>
                        </a>
                        <a className="simple-text logo-normal">
                            LCR Admin
                        </a>
                    </div>
                <div className="sidebar-wrapper">
                    <ul className="nav">
                        { this.state.width <= 991 ? (<HeaderLinks />):null }
                        <li className={this.activeRoute("/dashboard")}>
                            <NavLink to={'/dashboard'} className="nav-link" activeClassName="active">
                                <i className="pe-7s-home"></i>
                                <p>Dashboard</p>
                            </NavLink>
                        </li>
                        <li className={this.activeRoute("/shows")}>
                            <NavLink to={'/shows'} className="nav-link" activeClassName="active">
                                <i className="pe-7s-radio"></i>
                                <p>Shows</p>
                            </NavLink>
                        </li>
                        <li className={this.activeRoute("/episodes")}>
                            <NavLink to={'/episodes'} className="nav-link" activeClassName="active">
                                <i className="pe-7s-musiclist"></i>
                                <p>Episodes</p>
                            </NavLink>
                        </li>
                        {/*
                        <li className={this.activeRoute("/schedule")}>
                            <NavLink to={'/schedule'} className="nav-link" activeClassName="active">
                                <i className="pe-7s-clock"></i>
                                <p>Schedule</p>
                            </NavLink>
                        </li>
                        */}
                        <li className={this.activeRoute("/tokens")}>
                            <NavLink to={'/tokens'} className="nav-link" activeClassName="active">
                                <i className="pe-7s-key"></i>
                                <p>Tokens</p>
                            </NavLink>
                        </li>
                        <li className={this.activeRoute("/backup")}>
                            <NavLink to={'/backup'} className="nav-link" activeClassName="active">
                                <i className="pe-7s-server"></i>
                                <p>Backup</p>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sidebar;
