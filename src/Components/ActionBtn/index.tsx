import {
  Button,
  ButtonGroup,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";

interface IProps {
  id?: string;
  deleteOnClick: () => void;
}

const ActionBtn = ({ deleteOnClick }: IProps) => {
  return (
    <ButtonGroup aria-label="Basic example" style={{ width: "100%" }}>
      <Button variant="outline-primary" className="bi bi-pen"></Button>
      <Button
        onClick={deleteOnClick}
        variant="outline-danger"
        className="bi bi-trash"
      ></Button>
    </ButtonGroup>
  );
};

export default ActionBtn;
