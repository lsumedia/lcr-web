import React, {Component} from 'react';
import { Navbar } from 'react-bootstrap';

import HeaderLinks from './HeaderLinks.jsx';

/* global $ */

class Header extends Component{
    constructor(props){
        super(props);
        this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
        this.state = {
            sidebarExists: false,
            sessionData : {}
        };
        this.getAccountData();
    }

    getAccountData(){
        $.get('/sessiondata').done((data) => {
            console.log(data);
            this.setState({sessionData : data});
        });
    }

    mobileSidebarToggle(e){
        if(this.state.sidebarExists === false){
            this.setState({
                sidebarExists : true
            });
        }
        e.preventDefault();
        document.documentElement.classList.toggle('nav-open');
        var node = document.createElement('div');
        node.id = 'bodyClick';
        node.onclick = function(){
            this.parentElement.removeChild(this);
            document.documentElement.classList.toggle('nav-open');
        };
        document.body.appendChild(node);
    }
    render(){
        return (
            <Navbar fluid>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#pablo">{this.props.location.pathname.charAt(1).toUpperCase() + this.props.location.pathname.slice(2)}</a>
                    </Navbar.Brand>
                    <Navbar.Toggle onClick={this.mobileSidebarToggle}/>
                </Navbar.Header>
                <Navbar.Collapse id="header_navbar">
                    <HeaderLinks email={this.state.sessionData.email} />
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;
