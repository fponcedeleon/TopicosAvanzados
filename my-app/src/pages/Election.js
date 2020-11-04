import React, { useState } from "react";
import "../App.css";
import { createNewElection } from "../scripts/services/election.js";
import { createNewProposal } from "../scripts/services/proposal.js";
import { createNewOption } from "../scripts/services/option.js";
import { getFilteredUsers } from "../scripts/services/user.js";
import { customEmail, createNewToken } from "../scripts/services/auth.js";
import { useHistory } from "react-router-dom";
import Loading from "../components/Loading";

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

  // handle input change
  const handleInputChange = (e, index, i = null) => {
    const { name, value } = e.target;
    const list = [...proposalList];
    if (name == "options") {
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

  const handleSumbit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const startDateHr = event.target.startDateHr.value;
    const startDate = event.target.startDate.value + " " + startDateHr;
    const endDateHr = event.target.endDateHr.value;
    const endDate = event.target.endDate.value + " " + endDateHr;
    const minAge = event.target.minAge.value;
    const maxAge = event.target.maxAge.value;
    const city = event.target.city.value;
    const department = event.target.department.value;
    const nameEl = event.target.nameEl.value;

    try {
      const election = await createNewElection(
        startDate,
        endDate,
        minAge,
        maxAge,
        city,
        department,
        nameEl
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

      await sendCustomEmail(nameEl, endDate, minAge, maxAge, city, department);
      alert("Creada correctamente");
      history.push("/");
      setIsLoading(false);
    } catch (e) {
      alert("An error occurred, please try again");
      setIsLoading(false);
    }
  };

  return (
    <>
    {isLoading && <Loading />}
    {!isLoading && <form id="generateElection" onSubmit={handleSumbit}>
      <div className="container">
        <h1 className="election">Eleccion</h1>
        <p>Llene este formulario para crear una eleccion.</p>
        <label htmlFor="nameEl">
          <b>Nombre*</b>
        </label>
        <input
          type="text"
          placeholder="Eleccion 1"
          name="nameEl"
          id="nameEl"
          required
        ></input>
        <hr></hr>
        <label htmlFor="startDate">
          <b>Fecha Comienzo*</b>
        </label>
        <input
          type="date"
          placeholder="MM/DD/AAAA"
          name="startDate"
          id="startDate"
          required
        ></input>

        <hr></hr>
        <label htmlFor="startDateHr">
          <b>Hora Comienzo*</b>
        </label>
        <input
          type="text"
          placeholder="HH:MM"
          name="startDateHr"
          id="startDateHr"
          required
        ></input>

        <hr></hr>
        <label htmlFor="endDate">
          <b>Fecha Fin*</b>
        </label>
        <input
          type="date"
          placeholder="MM/DD/AAAA"
          name="endDate"
          id="endDate"
          required
        ></input>

        <hr></hr>
        <label htmlFor="endDateHr">
          <b>Hora Fin*</b>
        </label>
        <input
          type="text"
          placeholder="HH:MM"
          name="endDateHr"
          id="endDateHr"
          required
        ></input>

        <hr></hr>
        <label htmlFor="minAge">
          <b>Minimo de edad</b>
        </label>
        <input
          type="number"
          placeholder="Edad minima"
          name="minAge"
          id="minAge"
        ></input>

        <hr></hr>
        <label htmlFor="maxAge">
          <b>Maximo de edad</b>
        </label>
        <input
          type="number"
          placeholder="Edad maxima"
          name="maxAge"
          id="maxAge"
        ></input>

        <hr></hr>
        <label htmlFor="city">
          <b>Ciudad</b>
        </label>
        <input type="text" placeholder="Ciudad" name="city" id="city"></input>

        <hr></hr>
        <label htmlFor="department">
          <b>Departamento</b>
        </label>
        <input
          type="text"
          placeholder="Departamento"
          name="department"
          id="department"
        ></input>

        <hr></hr>
        {proposalList.map((x, i) => {
          return (
            <div>
              <label htmlFor="proposal">
                <b>Propuesta</b>
              </label>
              <input
                name="proposalName"
                placeholder="Propuesta"
                id="proposalName"
                value={x.proposalName}
                onChange={(e) => handleInputChange(e, i)}
              ></input>
              <input
                name="proposalDescription"
                placeholder="Descripcion"
                id="proposalDescription"
                value={x.proposalDescription}
                onChange={(e) => handleInputChange(e, i)}
              ></input>
              <label htmlFor="options">
                <b>Opciones</b>
              </label>
              {x.options.map((o, ind) => {
                return (
                  <div>
                    <input
                      placeholder={`Opcion ${ind}`}
                      name="options"
                      id="options"
                      value={o}
                      onChange={(e) => handleInputChange(e, i, ind)}
                    ></input>
                    {x.options.length - 1 === ind && (
                      <button onClick={(e) => handleAddOptionClick(e, i)}>
                        Add Option
                      </button>
                    )}
                  </div>
                );
              })}
              {proposalList.length - 1 === i && (
                <button onClick={handleAddClick}>Add Proposal</button>
              )}
            </div>
          );
        })}

        <hr></hr>

        <button type="submit" className="electionbtn">
          Crear eleccion
        </button>
      </div>
    </form>}
    </>
  );
}
