import { Routes, Route } from "react-router-dom";
// import "./styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Container } from "react-bootstrap";
import { lazy } from "react";
import { Suspense } from "react";
import MainHeader from "./layouts/MainHeader/index.js"

const Home = lazy(() => import("./layouts/Pages/Home/index.js"));
const Create = lazy(() => import("./layouts/Pages/Create/index.js"));
const List = lazy(() => import("./layouts/Pages/List/index.js"));

const App = () => {
  return (
    <Container
      fluid
      className="p-0 bg-secondary"
      style={{ minHeight: "100vh" }}
    >
      <MainHeader />
      {/* <Suspense fallback={<div>Cargando... Cargando...</div>}> */}
        <main>
          <Container fluid className="d-flex justify-content-center">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/read" element={<List />} />
              <Route path="/create" element={<Create />} />
            </Routes>
          </Container>
        </main>
      {/* </Suspense> */}
    </Container>
  );
};

export default App;

// const container = document.getElementById("root");

// if (!container) {
//   throw new Error("no container to render to");
// }

// const root = createRoot(container);
// root.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );
