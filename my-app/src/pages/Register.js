/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { register } from "../scripts/services/user";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Loading from "../components/Loading";


const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [department, setDepartment] = useState('');
  const [country, setCountry] = useState('');
  const [age, setAge] = useState(0);
  // Use the useForm hook to create a form instance

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert('Las contraseñas deben ser iguales');
      return;
    }

    setIsLoading(true);
    const user = {
      firstName,
      lastName,
      username,
      email,
      password,
      country,
      city,
      department,
      age,
    };
    register(user)
      .then(() => {
        setIsLoading(false);
        alert('Verificá tu email para confirmar tu cuenta');
      })
      .catch(error => {
        setIsLoading(false);
        alert(error);
      });
  }

  useEffect(() => {
    console.log(email);
  }, [email])

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading &&
        <Container>
          <Form onSubmit={handleSubmit}>
            <Row className="justify-content-md-center">
              <Col lg="8">
                <h2>Registro</h2>
                <hr />
                <Form.Group controlId="firstName">
                  <Form.Label>*Nombre</Form.Label>
                  <Form.Control required type="text" placeholder="Nombre" onChange={(e) => setFirstName(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="lastName">
                  <Form.Label>*Apellido</Form.Label>
                  <Form.Control required type="text" placeholder="Apellido" onChange={(e) => setLastName(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>*Email</Form.Label>
                  <Form.Control required type="email" placeholder="ejemplo@email.com" onChange={(e) => setEmail(e.target.value)} />
                  <Form.Text className="text-muted">
                    No compartiremos el email con nadie.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="username">
                  <Form.Label>*Nombre de Usuario</Form.Label>
                  <Form.Control required type="text" placeholder="usuario" onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>*Contraseña</Form.Label>
                  <Form.Control required type="password" placeholder="contraseña" onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="password2">
                  <Form.Label>*Repetir Contraseña</Form.Label>
                  <Form.Control required type="password" placeholder="Repetir contraseña" onChange={(e) => setPassword2(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="city">
                  <Form.Label>*Ciudad</Form.Label>
                  <Form.Control required type="text" placeholder="Ciudad" onChange={(e) => setCity(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="department">
                  <Form.Label>*Departamento</Form.Label>
                  <Form.Control required type="text" placeholder="Departamento" onChange={(e) => setDepartment(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="country">
                  <Form.Label>*País</Form.Label>
                  <Form.Control required type="text" placeholder="País" onChange={(e) => setCountry(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="age">
                  <Form.Label>*Edad</Form.Label>
                  <Form.Control required type="number" min="10" max="100" placeholder="Edad" onChange={(e) => setAge(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Button variant="primary" type="submit" className="center">
                Submit
              </Button>
            </Row>
          </Form>
        </Container>
      }
    </>
  );
}

export default RegisterForm;