import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
// import "./styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import Home from "./layouts/Home";
import List from "./layouts/List";
import Create from "./layouts/Create";

const App = () => {
  return (
    <Container
      fluid
      className="p-0 bg-secondary"
      style={{ minHeight: "100vh" }}
    >
      <Container fluid as="header" className="sticky-top p-0">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/read">
                Listado
              </Nav.Link>
              <Nav.Link as={NavLink} to="/create">
                Alta
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </Container>
      <main>
        <Container fluid className="d-flex justify-content-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/read" element={<List />} />
            <Route path="/create" element={<Create />} />
          </Routes>
        </Container>
      </main>
    </Container>
  );
};

export default App;

const container = document.getElementById("root");

if (!container) {
  throw new Error("no container to render to");
}

const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
