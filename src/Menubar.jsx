import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useHistory, Link } from 'react-router-dom';

export default function Menubar(props) {
  const history = useHistory();
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">CFDTest</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={() => history.push('/')}>Home</Nav.Link>
          <Nav.Link onClick={() => history.push('/coordinate')}>
            Coordinate
          </Nav.Link>
          <Nav.Link onClick={() => history.push('/chart')}>Charts</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
