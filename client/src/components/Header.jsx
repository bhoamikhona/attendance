import React, { useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext.js";

function Header() {
  const { user, logoutUser } = useContext(AppContext);

  return (
    <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} to={user?.name ? "/" : "/login"}>
          Attendance
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Item>
              {user?.isAdmin && (
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
              )}
            </Nav.Item>
            <Nav.Item>
              {user?.isAdmin && (
                <Nav.Link as={Link} to="/admin-records">
                  Users
                </Nav.Link>
              )}
            </Nav.Item>

            <Nav.Item>
              {!user?.name && (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              )}

              {user?.name && (
                <Nav.Link as={Button} variant="danger" onClick={logoutUser}>
                  Logout
                </Nav.Link>
              )}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
