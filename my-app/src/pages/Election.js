import React from "react";
import "../App.css";
import { createNewElection } from "../scripts/services/election.js";
import { createNewProposal } from "../scripts/services/proposal.js";
import { createNewOption } from "../scripts/services/option.js";

export default function Services() {
  async function addOption() {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Opcion";
    document.getElementById("newOpts").append(input);
  }

  const addProposal = async () => {
    const prop = document.createElement("div");
    const label = document.createElement("label");
    label.for = "proposal";
    const newB = document.createElement("b");
    newB.textContent = "Propuesta";
    label.append(newB);
    prop.append(label);
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Propuesta";
    prop.append(input);
    const inputDes = document.createElement("input");
    inputDes.type = "text";
    inputDes.placeholder = "Descripcion";
    prop.append(inputDes);
    const labelOpt = document.createElement("label");
    labelOpt.for = "options";
    const newB2 = document.createElement("b");
    newB2.textContent = "Opciones";
    labelOpt.append(newB2);
    prop.append(labelOpt);
    const inputOpt1 = document.createElement("input");
    inputOpt1.type = "text";
    inputOpt1.placeholder = "Opcion 1";
    prop.append(inputOpt1);
    const inputOpt2 = document.createElement("input");
    inputOpt2.type = "text";
    inputOpt2.placeholder = "Opcion 2";
    prop.append(inputOpt2);
    const div2 = document.createElement("div");
    div2.id = "newOpts";
    prop.append(div2);
    const newBtn = document.createElement("button");
    newBtn.type = "button";
    newBtn.class = "optionbtn";
    newBtn.onClick = { addOption };
    newBtn.textContent = "Add option";
    prop.append(newBtn);
    document.getElementById("newProp").append(prop);
  };

  const handleSumbit = async (event) => {
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

    const election = await createNewElection(
      "",
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
  };
  return (
    <form id="generateElection" onSubmit={handleSumbit}>
      <div class="container">
        <h1 className="election">Eleccion</h1>
        <p>Llene este formulario para crear una eleccion.</p>
        <label for="startDate">
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
        <div id="newOpts"></div>
        <button type="button" class="optionbtn" onClick={addOption}>
          Add option
        </button>
        <div id="newProp"></div>
        <button type="button" class="proposalbtn" onClick={addProposal}>
          Add proposal
        </button>

        <hr></hr>

        <button type="submit" class="electionbtn">
          Crear eleccion
        </button>
      </div>
    </form>
  );
}
