import React, { Component } from "react";
import { Navbar, NavbarBrand, Container } from "reactstrap";

class AppNav extends Component {
  state = {
    isOpen: false,
  };
  menutoggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  render() {
    return (
      <div>
        <Navbar className="mb-5 navbar">
          <Container className="navContainer">
            <NavbarBrand href="/" className="header">Steady</NavbarBrand>
          </Container>
        </Navbar>
      </div>
    );
  }
}
export default AppNav;
