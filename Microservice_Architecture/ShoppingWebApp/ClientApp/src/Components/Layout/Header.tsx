import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Badge, Button, Form, Nav, Navbar, InputGroup, Container } from "react-bootstrap";
import { useShoppingCartQuantity } from "../../Services/BasketService";

export const Header: FunctionComponent = () => {
  const quntity = useShoppingCartQuantity();
  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            AspnetRunBasics
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarToggler" />
          <Navbar.Collapse id="navbarToggler" className="justify-content-end">
            <Nav className="m-auto">
              <Nav.Link as={Link} to="/">
                Home <span className="sr-only">(current)</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/product">
                Product
              </Nav.Link>
              <Nav.Link as={Link} to="/cart">
                Cart
              </Nav.Link>
              <Nav.Link as={Link} to="/order">
                Order
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                Contact
              </Nav.Link>
            </Nav>

            <Form className="d-flex">
              <InputGroup className="me-2">
                <Form.Control type="search" placeholder="Search" aria-label="Search" />
                <Button variant="secondary" className="btn-number">
                  <i className="fa fa-search">Search</i>
                </Button>
              </InputGroup>

              <Link to="/cart" className="btn btn-success" style={{ minWidth: "fit-content" }}>
                <i className="fa fa-shopping-cart"></i> Cart
                {quntity ? (
                  <Badge bg="light" text="dark">
                    {quntity}
                  </Badge>
                ) : null}
              </Link>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
