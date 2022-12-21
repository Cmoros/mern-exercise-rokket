import { Container, ListGroup } from "react-bootstrap";

const Home = () => {
  return (
    <Container className="p-4 bg-dark p-2 text-white bg-opacity-75">
      <h1>Fullstack Engineer and Lead Software Engineer</h1>
      <p>
        Using the MERN stack (MongoDB, Express, React and NodeJS), create two
        separate applications (backend and frontend) that allow a user to manage
        an inventory of any item. The item managed by this app is up to you!
      </p>
      <p>The two applications must perform the following functions:</p>
      <h2>Backend</h2>
      <ListGroup>
        <ListGroup.Item>
          Get: fetch all items from the database and return them
        </ListGroup.Item>
        <ListGroup.Item>
          Create: create a new item, save it to the database and return it
        </ListGroup.Item>
        <ListGroup.Item>
          Delete: deletes a specific item and returns true if successful
        </ListGroup.Item>
      </ListGroup>
      <h2 className="pt-2">Frontend</h2>
      <ListGroup>
        <ListGroup.Item>Single view application</ListGroup.Item>
        <ListGroup.Item>
          Allows the user to view all items in the database (through a table or
          similar)
        </ListGroup.Item>
        <ListGroup.Item>
          Allows the user to create a new item and see the list of items updated
          after inserting it
        </ListGroup.Item>
        <ListGroup.Item>
          Allows the user to delete a specific item by clicking on a delete
          button
        </ListGroup.Item>
      </ListGroup>
      <p className="pt-2">
        Example The chosen item are animals at the zoo, so the user may view all
        animals (including some specific data), input any new animals that have
        arrived and delete the record of any chosen animal.
      </p>
      <h3 className="pt-2">Requirements </h3>
      <ListGroup>
        <ListGroup.Item>Must be built using the MERN stack</ListGroup.Item>
        <ListGroup.Item>
          All frontend styles are up to you, show us your creativity!
        </ListGroup.Item>
        <ListGroup.Item>
          Both apps must be documented with a README file
        </ListGroup.Item>
        <ListGroup.Item>
          All libraries and packages (besides the MERN stack) are up to you
        </ListGroup.Item>
      </ListGroup>
      <h2 className="pt-2">Extra Points </h2>
      <p>
        The following are NOT required, but may give you an advantage, so they
        are highly encouraged:
      </p>
      <ListGroup>
        <ListGroup.Item>
          Use of containers (Docker and Docker Compose){" "}
        </ListGroup.Item>
        <ListGroup.Item>Kubernetes deployment files </ListGroup.Item>
        <ListGroup.Item>Typescript </ListGroup.Item>
        <ListGroup.Item>End-to-end backend testing (with Jest)</ListGroup.Item>
      </ListGroup>
    </Container>
  );
};

export default Home;
