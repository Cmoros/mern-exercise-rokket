import { Button, ButtonGroup } from "react-bootstrap";
import User from "../../../types/User.js";

interface IProps {
  user: User;
  deleteOnClick: () => void;
  handleShow: (user: User) => void;
}

const ActionBtn = ({ deleteOnClick, user, handleShow }: IProps) => {
  return (
    <ButtonGroup aria-label="Basic example" style={{ width: "100%" }}>
      <Button
        variant="outline-primary"
        className="bi bi-eye-fill"
        onClick={() => handleShow(user)}
      ></Button>
      <Button
        onClick={deleteOnClick}
        variant="outline-danger"
        className="bi bi-trash"
      ></Button>
    </ButtonGroup>
  );
};

export default ActionBtn;
