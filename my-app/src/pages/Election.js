import React from "react";
import "../App.css";
import { createNewElection } from "../scripts/services/election.js";
import { createNewProposal } from "../scripts/services/proposal.js";
import { createNewOption } from "../scripts/services/option.js";
import { getFilteredUsers, getCurrent } from "../scripts/services/user.js";
import { customEmail, createNewToken } from "../scripts/services/auth.js";
import { useHistory } from "react-router-dom";

const baseUrl =
  process.env.NODE_ENV === "localhost"
    ? "http://localhost:3000"
    : process.env.ENVIRONMENT === "test"
    ? "https://topicos2020testing.netlify.app"
    : "https://topicos2020.netlify.app";

export default function Services() {
  let electionId;
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
    const startDateHr = event.target.startDateHr.value;
    const startDate = event.target.startDate.value + " " + startDateHr;
    const endDateHr = event.target.endDateHr.value;
    const endDate = event.target.endDate.value + " " + endDateHr;
    const minAge = event.target.minAge.value;
    const maxAge = event.target.maxAge.value;
    const city = event.target.city.value;
    const department = event.target.department.value;
    const name = event.target.proposalName.value;
    const description = event.target.proposalDescription.value;
    const opt1 = event.target.optionOne.value;
    const opt2 = event.target.optionTwo.value;
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
  
      const proposal = await createNewProposal(
        election.data.id,
        name,
        description
      );
      const propId = proposal.data.id;
  
      await createNewOption(propId, opt1);
      await createNewOption(propId, opt2);
  
      await sendCustomEmail(nameEl, endDate, minAge, maxAge, city, department);
      alert('Creada correctamente');
      history.push("/");
    }
    catch (e) {
      alert("An error occurred, please try again");
    }
  };
  
  return (
    <form id="generateElection" onSubmit={handleSumbit}>
      <div class="container">
        <h1 className="election">Eleccion</h1>
        <p>Llene este formulario para crear una eleccion.</p>
        <label for="nameEl">
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
        <label for="startDate">
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
        <label for="startDateHr">
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
        <label for="endDate">
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
        <label for="endDateHr">
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
        <label for="minAge">
          <b>Minimo de edad</b>
        </label>
        <input
          type="text"
          placeholder="Edad minima"
          name="minAge"
          id="minAge"
        ></input>

        <hr></hr>
        <label for="maxAge">
          <b>Maximo de edad</b>
        </label>
        <input
          type="text"
          placeholder="Edad maxima"
          name="maxAge"
          id="maxAge"
        ></input>

        <hr></hr>
        <label for="city">
          <b>Ciudad</b>
        </label>
        <input type="text" placeholder="Ciudad" name="city" id="city"></input>

        <hr></hr>
        <label for="department">
          <b>Departamento</b>
        </label>
        <input
          type="text"
          placeholder="Departamento"
          name="department"
          id="department"
        ></input>

        <hr></hr>
        <label for="proposal">
          <b>Propuesta</b>
        </label>
        <input
          type="text"
          placeholder="Propuesta"
          name="proposalName"
          id="proposalName"
        ></input>
        <input
          type="text"
          placeholder="Descripcion"
          name="proposalDescription"
          id="proposalDescription"
        ></input>

        <hr></hr>
        <label for="options">
          <b>Opciones</b>
        </label>
        <input
          type="text"
          placeholder="Opcion 1"
          name="optionOne"
          id="optionOne"
        ></input>
        <input
          type="text"
          placeholder="Opcion 2"
          name="optionTwo"
          id="optionTwo"
        ></input>

        <hr></hr>

        <button type="submit" class="electionbtn">
          Crear eleccion
        </button>
      </div>
    </form>
  );
}
