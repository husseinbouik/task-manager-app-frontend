import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';

function NavbarComponent() {
  const navigate = useNavigate();

  const handleLogout = () => {
    //Implement your logout logic here (clear token, etc.)
    localStorage.removeItem('token'); // Example: remove token from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Task Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
          </Nav>
          <Nav>
            {localStorage.getItem('token') ? (
              <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;