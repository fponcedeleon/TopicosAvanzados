import React from "react";
import "../App.css";
import { createNewElection } from "../scripts/services/election.js";
import { createNewProposal } from "../scripts/services/proposal.js";
import { createNewOption } from "../scripts/services/option.js";
import { getAllUsers } from "../scripts/services/user.js";
import { customEmail } from "../scripts/services/auth.js";

export default function Services() {
  const sendCustomEmail = async (electionName, endDate) => {
    const users = await getAllUsers();

    const subject = "Nueva eleccion";
    users.forEach((user) => {
      // const electionLink = generateNewLink();
      const electionLink = "link";
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
    console.log("1")
    event.preventDefault();
    const startDate = event.target.startDate.value;
    const endDate = event.target.endDate.value;
    const minAge = event.target.minAge.value;
    const maxAge = event.target.maxAge.value;
    const city = event.target.city.value;
    const country = event.target.country.value;
    const name = event.target.proposalName.value;
    const description = event.target.proposalDescription.value;
    const opt1 = event.target.optionOne.value;
    const opt2 = event.target.optionTwo.value;
    const nameEl = event.target.nameEl.value;

    console.log("2")
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

    const proposal = await createNewProposal(
      election.data.id,
      name,
      description
    );
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
        <label for="endDate">
          <b>Final*</b>
        </label>
        <input
          type="text"
          placeholder="MM/DD/AAAA"
          name="endDate"
          id="endDate"
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
