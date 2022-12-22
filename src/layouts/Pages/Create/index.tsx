import { FC, FormEvent } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  if (!(e.target instanceof HTMLFormElement)) return;
  const formData = new FormData(e.target);
  const result = await fetch("/api/user/", {
    method: "post",
    body: formData,
  }).then((res) => res.json());
  e.target.reset();
  console.log(result);
};

const Create = () => {
  return (
    <Container className="bg-light p-4 mt-4 rounded m-auto w-75">
      <Form autoComplete="off" onSubmit={handleSubmit}>
        {/* <Row className="flex-column flex-sm-row">
          <FormColumn
            label="Nombre de usuario"
            placeholder="Nombre"
            name="name"
          />
          <FormColumn label="Usuario" placeholder="Usuario" name="username" />
        </Row>
        <Row className="flex-column flex-md-row">
          <FormColumn label="Email" placeholder="Email" name="email" />
          <FormColumn label="Telefono" placeholder="Telefono" name="phone" />
          <FormColumn label="Pagina web" placeholder="Web" name="website" />
        </Row> */}

        <Row className="flex-column flex-sm-row">
          <Col>
            <Form.Group className="mb-3" controlId="a">
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control type="text" placeholder="Nombre" name="name" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="b">
              <Form.Label>Usuario</Form.Label>
              <Form.Control type="text" placeholder="Usuario" name="username" />
            </Form.Group>
          </Col>
        </Row>
        <Row className="flex-column flex-md-row">
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Mail" name="email" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Telefono</Form.Label>
              <Form.Control type="text" placeholder="Numero" name="phone" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Pagina Web</Form.Label>
              <Form.Control type="text" placeholder="Web" name="website" />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="m-auto d-block">
          Enviar
        </Button>
      </Form>
    </Container>
  );
};

export default Create;

const FormColumn: FC<any> = ({ label, placeholder, name }) => (
  <Col>
    <Form.Group className="mb-3" controlId="a">
      <Form.Label>{label}</Form.Label>
      <Form.Control type="text" placeholder={placeholder} name={name} />
    </Form.Group>
  </Col>
);
