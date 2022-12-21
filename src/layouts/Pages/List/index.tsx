import { Button, Container, Table } from "react-bootstrap";
import { useState } from "react";
import User from "../../../../types/User.js";
import { useEffect } from "react";
import UserRow from "./UserRow.js";
import UserModal from "../../../Components/Modal/UserModal.js";

const searchAllUsers: () => Promise<User[]> = async () => {
  return fetch("/api/user/").then((res) => res.json());
};

const fetchNewUsers: () => Promise<User[]> = async () => {
  return fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
    res.json()
  );
};

const updateDomUsers: (
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
) => void = async (setUsers) => {
  setUsers(await searchAllUsers());
};

const handleRefill: (
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
) => void = async (setUsers) => {
  const newUsers = await fetchNewUsers();
  console.log("🚀 ~ onClick={ ~ newUsers", newUsers);
  try {
    const resultFetch = await fetch("/api/user/", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ user: newUsers }),
    }).then((res) => res.json());
    console.info(resultFetch);
    updateDomUsers(setUsers);
  } catch (e: unknown) {
    console.error("Error en el REFILL: ", e);
  }
};

export type HandleDelete = (
  userId: string,
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
) => void;

const handleDelete: HandleDelete = async (userId, setUsers) => {
  try {
    const userDeleted = await fetch("/api/user/" + userId, {
      method: "DELETE",
    }).then((res) => res.json());
    console.info("User Deleted:", userDeleted);
    updateDomUsers(setUsers);
  } catch (e: unknown) {
    console.error("Error en el DELETE");
  }
};

const List = () => {
  const [userModal, setUserModal] = useState({} as User);
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([] as User[]);
  useEffect(() => {
    updateDomUsers(setUsers);
  }, []);
  return (
    <Container className="py-2">
      <Container className="py-2 bg-dark rounded">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Usuario</th>
              <th className="d-none d-md-table-cell">Mail</th>
              <th className="d-none d-sm-table-cell">Numero</th>
              <th className="d-none d-lg-table-cell">Website</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserRow
                user={user}
                key={user.id}
                handleShow={(user: User) => {
                  setUserModal(user);
                  setShowModal(true);
                }}
                deleteOnClick={() => handleDelete(user.id, setUsers)}
              />
            ))}
          </tbody>
        </Table>
      </Container>
      <Button onClick={async () => handleRefill(setUsers)}>Refill users</Button>
      <Button onClick={async () => updateDomUsers(setUsers)}>
        Refrescar usuarios
      </Button>
      <UserModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        user={userModal}
      />
    </Container>
  );
};

export default List;
