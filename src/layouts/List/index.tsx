import { Button, Container, Table } from "react-bootstrap";
import ActionBtn from "../../Components/ActionBtn";
import { useState } from "react";

interface UserTable {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

const defaultValues: UserTable[] = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "Nathan@yesenia.net",
    phone: "1-463-123-4447",
    website: "ramiro.info",
  },
];

const deleteUser = (id: number, array: UserTable[]) => {
  return array.filter((user) => user.id !== id);
};

const searchUsers: () => Promise<UserTable[]> = async () => {
  return fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
    res.json()
  );
};

const List = () => {
  const [users, setUsers] = useState(defaultValues);
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
            {users.map(({ id, name, username, email, phone, website }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{username}</td>
                <td className="d-none d-md-table-cell">{email}</td>
                <td className="d-none d-sm-table-cell">{phone}</td>
                <td className="d-none d-lg-table-cell">{website}</td>
                <td>
                  <ActionBtn
                    deleteOnClick={() => {
                      setUsers(deleteUser(id, users));
                    }}
                  ></ActionBtn>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <Button onClick={async () => setUsers(await searchUsers())}>
        Refill users
      </Button>
    </Container>
  );
};

export default List;
