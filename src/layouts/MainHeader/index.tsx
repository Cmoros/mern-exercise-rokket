import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const MainHeader = () => {
  return (
    <Container fluid as="header" className="sticky-top p-0">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Cmoros
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/read">
              Listado
            </Nav.Link>
            <Nav.Link as={Link} to="/create">
              Alta
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </Container>
  );
};

export default MainHeader;
