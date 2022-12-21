import { Button, ListGroup, Modal } from "react-bootstrap";
import User from "../../../types/User.js";

interface IProps {
  user: User;
  show: boolean;
  handleClose: () => void;
}

const UserModal = ({ user, show, handleClose }: IProps) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>User Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          <ListGroup.Item>Id: {user.id}</ListGroup.Item>
          <ListGroup.Item>Name: {user.name}</ListGroup.Item>
          <ListGroup.Item>Email: {user.email}</ListGroup.Item>
          <ListGroup.Item>Phone {user.phone}</ListGroup.Item>
          <ListGroup.Item>Website: {user.website}</ListGroup.Item>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
