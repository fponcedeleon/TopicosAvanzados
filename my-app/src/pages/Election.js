/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../App.css";
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { createNewElection } from "../scripts/services/election.js";
import { createNewProposal } from "../scripts/services/proposal.js";
import { createNewOption } from "../scripts/services/option.js";
import { getFilteredUsers } from "../scripts/services/user.js";
import { customEmail, createNewToken } from "../scripts/services/auth.js";
import { useHistory } from "react-router-dom";
import Loading from "../components/Loading";
import DateTimePicker from 'react-datetime-picker';

const baseUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://topicos2020.netlify.app";

export default function Services() {
  const [proposalList, setProposalList] = useState([
    { proposalName: "", proposalDescription: "", options: [""] },
  ]);
  const [boolAux, setBoolAux] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [startValue, setStartValue] = useState(new Date());
  const [endValue, setEndValue] = useState(new Date(new Date().getTime() + 1));
  const [maxAge, setMaxAge] = useState(0);
  const [minAge, setMinAge] = useState(0);
  const [city, setCity] = useState('');
  const [department, setDepartment] = useState('');

  // handle input change
  const handleInputChange = (e, index, i = null) => {
    const { name, value } = e.target;
    const list = [...proposalList];
    if (name === "options") {
      list[index][name][i] = value;
    } else {
      list[index][name] = value;
    }
    setProposalList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setProposalList([
      ...proposalList,
      { proposalName: "", proposalDescription: "", options: [""] },
    ]);
  };

  const handleAddOptionClick = (e, i) => {
    e.preventDefault();
    proposalList[i]["options"].push("");
    setBoolAux(!boolAux);
  };

  let electionId = null;
  const history = useHistory();

  const generateNewLink = async (id) => {
    const token = await createNewToken(electionId, id);
    return `${baseUrl}/VotingDetails/${electionId}?token=${token.data.token}`;
  };

  const sendCustomEmail = async (
    electionName,
    endDate,
    minAge,
    maxAge,
    city,
    department
  ) => {
    const users = await getFilteredUsers(minAge, maxAge, city, department);

    const subject = "Nueva eleccion";
    users.forEach(async (user) => {
      const electionLink = await generateNewLink(user._id);
      customEmail(
        user.firstName,
        user.email,
        electionName,
        electionLink,
        subject,
        true,
        endDate
      );
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const election = await createNewElection(
        startValue,
        endValue,
        minAge,
        maxAge,
        city,
        department,
        name,
      );

      electionId = election.data.id;

      proposalList.forEach(async (prop) => {
        const proposal = await createNewProposal(
          electionId,
          prop.proposalName,
          prop.proposalDescription
        );
        const propId = proposal.data.id;
        prop.options.forEach(async (op) => {
          await createNewOption(propId, op);
        });
      });

      await sendCustomEmail(name, endValue, minAge, maxAge, city, department);
      setIsLoading(false);
      alert("Elección creada correctamente");
      history.push("/");
    } catch (e) {
      setIsLoading(false);
      alert("Ocurrió un error. Por favor, intentalo nuevamente");
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading &&
        <Form onSubmit={handleSubmit}>
          <Row className="justify-content-md-center">
            <Col lg="8">
              <h2>Nueva Elección</h2>
              <hr />
              <Form.Group controlId="name">
                <Form.Label>*Nombre</Form.Label>
                <Form.Control required type="text" placeholder="Elección 1" onChange={(e) => setName(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="startDate">
                <Form.Label>*Fecha Inicio</Form.Label> <br />
                <DateTimePicker
                  onChange={setStartValue}
                  value={startValue}
                />
              </Form.Group>

              <Form.Group controlId="endDate">
                <Form.Label>*Fecha Fin</Form.Label> <br />
                <DateTimePicker
                  onChange={setEndValue}
                  value={endValue}
                />
              </Form.Group>

              <Form.Group controlId="minAge">
                <Form.Label>Mínimo edad</Form.Label>
                <Form.Control type="number" min="10" max="100" placeholder="20" onChange={(e) => setMinAge(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="maxAge">
                <Form.Label>Máximo edad</Form.Label>
                <Form.Control type="number" min="10" max="100" placeholder="30" onChange={(e) => setMaxAge(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="city">
                <Form.Label>Ciudad</Form.Label>
                <Form.Control type="text" placeholder="Montevideo" onChange={(e) => setCity(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="ciudad">
                <Form.Label>Departamento</Form.Label>
                <Form.Control type="text" placeholder="Montevideo" onChange={(e) => setDepartment(e.target.value)} />
              </Form.Group>

              {
                proposalList.map((proposal, i) => (
                  <Card key={i} style={{ marginTop: "1rem" }}>
                    <Card.Body>
                      <Card.Title>Propuesta {i + 1}</Card.Title>
                      {/* <hr /> */}
                      <Form.Group controlId={`proposal-${i}`}>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" name="proposalName" placeholder={`Propuesta ${i + 1}`} onChange={(e) => handleInputChange(e, i)} value={proposal.proposalName} />
                      </Form.Group>

                      <Form.Group controlId={`description-${i}`}>
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control type="text" name="proposalDescription" placeholder={`Descripción ${i + 1}`} onChange={(e) => handleInputChange(e, i)} value={proposal.proposalDescription} />
                      </Form.Group>

                      {
                        proposal.options.map((option, index) => (
                          <div key={index}>
                            <strong>Opción {index + 1}</strong>
                            <hr />
                            <Form.Group controlId={`option-${index + 1}`}>
                              <Form.Control type="text" name="options" placeholder={`Propuesta ${i + 1} - Opción ${index + 1}`} onChange={(e) => handleInputChange(e, i, index)} value={option} />
                            </Form.Group>

                            {
                              proposal.options.length - 1 === index &&
                              <Button variant="outline-primary" type="button" className="center" onClick={(e) => handleAddOptionClick(e, i)}>
                                Agregar Opción
                        </Button>
                            }
                            {
                              proposalList.length - 1 === i  && proposal.options.length - 1 === index &&
                              <Button variant="outline-info" type="button" className="center" onClick={handleAddClick}>
                                Agregar Propuesta
                        </Button>
                            }
                          </div>
                        ))

                      }
                    </Card.Body>
                  </Card>
                ))
              }
            </Col>
          </Row>
          <Row className="justify-content-md-center" style={{margin: "2rem"}}>
            <Button variant="primary" type="submit" className="center">
              Submit
        </Button>
          </Row>
        </Form>
      }
    </>
  );
}
