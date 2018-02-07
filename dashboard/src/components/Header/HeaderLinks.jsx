import React, {Component} from 'react';
import { NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';


class HeaderLinks extends Component{
    render(){
        const notification = (
            <div>
                <i className="fa fa-globe"></i>
                <b className="caret"></b>
                <span className="notification">5</span>
                <p className="hidden-lg hidden-md">Notification</p>
            </div>
        );
        return (
            <div>
                <Nav>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={1} href="">{this.props.email}</NavItem>
                    <NavItem eventKey={3} href="/endsession">Log out</NavItem>
                </Nav>
            </div>
        );
    }
}

export default HeaderLinks;
