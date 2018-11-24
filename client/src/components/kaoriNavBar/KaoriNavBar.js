import React from "react";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";

class KaoriNavBar extends React.Component {
    constructor(props) {
        super(props);
    }
    // this.state = {};

    render() {
        return(
            <div className="kaori-navbar">
             <Navbar inverse={true}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#brand">React-Bootstrap</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse expanded={true}>
                        <Nav>
                            <NavItem eventKey={1} href="#">
                                Link
                            </NavItem>
                            <NavItem eventKey={2} href="#">
                                Link
                            </NavItem>
                            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                                <MenuItem eventKey={3.1}>Action </MenuItem>       
                                <MenuItem eventKey={3.2}>Another action</MenuItem>
                                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={3.3}>Separated Link</MenuItem>
                            </NavDropdown>
                        </Nav>

                        <Nav pullRight>
                            <NavItem eventKey={1} href="#">
                                Link Right
                            </NavItem>
                            <NavItem eventKey={2} href="#">
                                Link Right
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

            </div>
        )
    }
};

export default KaoriNavBar;

/*
*/