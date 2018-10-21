import * as React from 'react';
import { Link } from 'react-router-dom';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink } from 'reactstrap';

export class MainNavigation extends React.Component<any, any>{
    
    constructor(props: any) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }

      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

    public render(){
        return(
            <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Loughborough Campus Radio</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/dashboard/">Dashboard</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/dashboard/shows">Shows</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/dashboard/episodes">Episodes</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/dashboard/tokens/">Tokens</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/dashboard/users">Users</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
        )
    }

}