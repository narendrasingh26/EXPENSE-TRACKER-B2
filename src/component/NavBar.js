import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";


import AuthContext from "./store/auth-context";
import { useContext } from "react";
import { useSelector } from "react-redux";

function CNavbar() {
  const authCtx = useContext(AuthContext);
  // const isLoggedIn = authCtx.isLoggedIn;
  const history = useHistory();
 const showCart= useSelector(state=>state.auth.isLoggedIn)

  const logoutHandler = () => {
    authCtx.logout();
    console.log('logout done')
    history.replace("/login");
  };
  return (
    <Navbar bg="dark" variant="dark" expand="md" className="sticky-top">
      <Navbar.Brand as={Link} to="/home">
        HOME
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="mr-auto">
         
        
       
          {!showCart && (
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          )}
        </Nav>
        {showCart && <button type="button"
        className="btn btn-primary position-relative "
        style={{
          fontSize: "0.75rem",
          padding: "0.25rem 0.5rem",
          fontWeight: "bold",
          marginLeft:'63rem',
          marginTop:'-5px'
        }} onClick={logoutHandler}>Logout</button>}
      </Navbar.Collapse>
      <div>
        <div style={{ marginRight: "2rem", marginTop: "-.5rem" }}>
          {/* <Cart /> */}
        </div>
      </div>
    </Navbar>
  );
}

export default CNavbar;
