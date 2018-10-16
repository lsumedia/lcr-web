import * as React from 'react';

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
                <NavLink href="/components/">Dashboard</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/components/">Shows</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/components/">Episodes</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/components/">Tokens</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/components/">User</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
        )
    }

}