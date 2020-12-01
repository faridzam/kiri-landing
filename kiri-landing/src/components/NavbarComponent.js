import React from "react";
import {Nav, Navbar, NavDropdown, Container } from 'react-bootstrap'

const NavbarComponent = () => {
  return (
    <Navbar variant="dark" expand="lg">
      <Container>
      <Navbar.Brand href="#home">KIRIKOPI</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Services</Nav.Link>
          <Nav.Link href="#link">About Us</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
