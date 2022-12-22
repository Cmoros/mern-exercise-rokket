import { Button, Container, Table } from "react-bootstrap";
import { useState } from "react";
import User from "../../../../types/User.js";
import { useEffect } from "react";
import UserRow from "./UserRow.js";
import UserModal from "../../../Components/Modal/UserModal.js";
// import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";

const searchAllUsers: () => Promise<User[]> = async () => {
  return fetch("/api/user/").then((res) => res.json());
};

const fetchNewUsers: () => Promise<User[]> = async () => {
  return fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
    res.json()
  );
};

/**
 * Axios => Respuesta directamente json
 * const result = await axios.get(link) => json
 *
 * Dentro de try-catch. Códigos 4**-5** directamente al catch. Captura de errores.
 *
 * res.status(403).send({message: 'La estas cagando papi, revisate, y pide permiso'})
 *
 * catch(e) {
 *   if (e?.message){
 *     setModalMessage(e.message)
 *   }
 * }
 *
 */

const updateDomUsers: (
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
) => void = async (setUsers) => {
  setUsers(await searchAllUsers());
};

const handleRefill: (
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
) => void = async (setUsers) => {
  try {
    const newUsers = await fetchNewUsers(); // json de new users

    const resultFetch = await fetch("/api/user/", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ user: newUsers }),
    });

    const jsonDecode = await resultFetch.json();

    // const resultFetch = fetch("/api/user/", {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   method: "POST",
    //   body: JSON.stringify({ user: newUsers }),
    // }).then((res) => res.json());
    fetch("/api/user/", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ user: newUsers }),
    }).then((res) => {
      const resultFetch = res.json();

      updateDomUsers(setUsers);
    });

    // console.info(resultFetch);
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
  const [showModal, setShowModal] = useState(false); // Omit<User, 'website' | 'phone'> => un objeto con todo menos website y phone
  const [userModal, setUserModal] = useState<User | undefined>(); // El objeto va a estar pero no con todas sus propiedas. Pick<User, 'website' | 'phone'> => un objeto con website y phone
  const [users, setUsers] = useState<User[]>([]);

  // const { mutateAsync } = useMutation<Response, unknown, string>(
  //   (userId) => fetch("/api/user/" + userId, { method: "DELETE" }),
  //   {
  //     onSuccess: () => {
  //       // setAction
  //     },
  //   }
  // );

  // const {isLoading, data} = useQuery(['getAllUsers'], () => fetch("/api/user/").then((res) => res.json()), {
  //   enabled: false,
  //   onSuccess: ({data}) => {
  //     // setUsers(data)
  //   }
  // })

  // return isLoading ? <>Componente con carga</> : <>{data}</>

  // const queryClient = useQueryClient()
  // queryClient.refetchQueries(['getAllUsers'])

  const handleShow = (user: User) => {
    setUserModal(user);
    setShowModal(true);
  };

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
                handleShow={handleShow}
                // deleteOnClick={() => mutateAsync(user.id)}
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
      {userModal ? (
        <UserModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          user={userModal}
        />
      ) : null}
    </Container>
  );
};

export default List;
