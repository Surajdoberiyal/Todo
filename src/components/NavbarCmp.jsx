import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useContext } from "react";
import CartContext from "../Context/Cart/CartContext";
import { Link } from "react-router-dom";

function NavbarCmp() {
  const { cartItems } = useContext(CartContext);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      className="py-2 position-sticky top-0"
      style={{ zIndex: "999" }}
    >
      <Container>
        <Link to={"/"} className="nav-link">
          <Navbar.Brand>E-commerce</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto pe-4">
            <Link to={"/"} className="nav-link mx-3">
              Home
            </Link>

            <Link to={"/todo"} className="nav-link mx-3">
              Todo
            </Link>
            <Link to={"/table"} className="nav-link mx-3">
              Table
            </Link>
          </Nav>
          <Nav>
            <Link to="/cart" className="nav-link">
              <h4 className="mb-0 position-relative">
                <i className="bx bxs-cart " />
                {cartItems?.length > 0 && (
                  <span className="cart_circle">{cartItems?.length}</span>
                )}
              </h4>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarCmp;
