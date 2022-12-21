import ActionBtn from "../../../Components/ActionBtn/index.js";
import User from "../../../../types/User.js";

interface IProps {
  user: User;
  deleteOnClick: () => void;
  handleShow: (user: User) => void;
}

const UserRow = ({ user, deleteOnClick, handleShow }: IProps) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.username}</td>
      <td className="d-none d-md-table-cell">{user.email}</td>
      <td className="d-none d-sm-table-cell">{user.phone}</td>
      <td className="d-none d-lg-table-cell">{user.website}</td>
      <td>
        <ActionBtn
          user={user}
          deleteOnClick={deleteOnClick}
          handleShow={handleShow}
        />
      </td>
    </tr>
  );
};

export default UserRow;
