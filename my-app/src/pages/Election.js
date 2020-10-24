import React from "react";
import "../App.css";
import { createNewElection } from "../scripts/services/election.js";
import { createNewProposal } from "../scripts/services/proposal.js";
import { createNewOption } from "../scripts/services/option.js";
import { getAllUsers } from "../scripts/services/user.js";
import { customEmail, createNewToken } from "../scripts/services/auth.js";

const baseUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://topicossw.herokuapp.com";

export default function Services() {
  let electionId;

  const generateNewLink = async (id) => {
    const token = await createNewToken(electionId, id);
    return `${baseUrl}/VotingDetails/${electionId}?token=${token.data.token}`;
  };

  const sendCustomEmail = async (electionName, endDate) => {
    const users = await getAllUsers();

    const subject = "Nueva eleccion";
    users.forEach((user) => {
      const electionLink = generateNewLink(user.id);
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
    console.log("1");
    event.preventDefault();
    const startDateHr = event.target.startDateHr.value;
    const startDate = event.target.startDate.value + " " + startDateHr;
    const endDateHr = event.target.endDateHr.value;
    const endDate = event.target.endDate.value + " " + endDateHr;
    const minAge = event.target.minAge.value;
    const maxAge = event.target.maxAge.value;
    const city = event.target.city.value;
    const country = event.target.country.value;
    const name = event.target.proposalName.value;
    const description = event.target.proposalDescription.value;
    const opt1 = event.target.optionOne.value;
    const opt2 = event.target.optionTwo.value;
    const nameEl = event.target.nameEl.value;

    console.log("2");
    const election = await createNewElection(
      "test",
      startDate,
      endDate,
      minAge,
      maxAge,
      city,
      country,
      nameEl
    );
    electionId = election.data.id;

    const proposal = await createNewProposal(electionId, name, description);
    const propId = proposal.data.id;

    await createNewOption(propId, opt1);
    await createNewOption(propId, opt2);

    await sendCustomEmail(name, endDate);
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
          <b>Comienzo*</b>
        </label>
        <input
          type="text"
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
          <b>Finalizado*</b>
        </label>
        <input
          type="text"
          placeholder="MM/DD/AAAA"
          name="endDate"
          id="endDate"
          required
        ></input>

        <hr></hr>
        <label for="endDateHr">
          <b>Hora Finalizado*</b>
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
        <label for="country">
          <b>Pais</b>
        </label>
        <input
          type="text"
          placeholder="Pais"
          name="country"
          id="country"
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
