import React from "react";
import "../App.css";
import { createNewElection } from "../scripts/services/election.js";
import { createNewProposal } from "../scripts/services/proposal.js";
import { createNewOption } from "../scripts/services/option.js";
import { getAllUsers } from "../scripts/services/user.js";
import { customEmail } from "../scripts/services/auth.js";

export default function Services() {
  var auxprop = 0;
  async function addOption() {
    const input = document.createElement("input");
    input.type = "text";
    input.className = "form-control";
    input.placeholder = "Opcion";
    console.log(auxprop);
    switch (auxprop) {
      case 0:
        //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor1
        document.getElementById("newOpts").append(input);
        break;
      case 1:
        //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor2
        document.getElementById("newOpts1").append(input);
        break;
      case 2:
        //Declaraciones ejecutadas cuando el resultado de expresión coincide con valorN
        document.getElementById("newOpts2").append(input);
        break;
      case 3:
        //Declaraciones ejecutadas cuando el resultado de expresión coincide con valorN
        document.getElementById("newOpts3").append(input);
        break;
      case 4:
        //Declaraciones ejecutadas cuando el resultado de expresión coincide con valorN
        document.getElementById("newOpts4").append(input);
        break;
      default:
        //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
        console.log(auxprop);
        break;
    }
    /**if(auxprop!==0){
      var elem="newOpts"+ auxprop;
      console.log(elem);
      document.getElementById().append(input);
    }
    else{
      document.getElementById("newOpts").append(input);
    }**/
  }

  const addProposal = async () => {
    if (auxprop <= 3) {
      auxprop = auxprop + 1;
      const prop = document.createElement("div");
      const label = document.createElement("label");
      label.for = "proposal";
      const newB = document.createElement("b");
      newB.textContent = "Propuesta " + auxprop;
      label.append(newB);
      prop.append(label);
      const input = document.createElement("input");
      input.type = "text";
      input.className = "form-control";
      input.placeholder = "Propuesta";
      input.name = "proposalName" + auxprop;
      input.id = "proposalName" + auxprop;
      prop.append(input);
      const inputDes = document.createElement("input");
      inputDes.type = "text";
      inputDes.className = "form-control";
      inputDes.placeholder = "Descripcion";
      inputDes.name = "proposalDescription" + auxprop;
      inputDes.id = "proposalDescription" + auxprop;
      prop.append(inputDes);
      const brNew = document.createElement("br");
      prop.append(brNew);
      const labelOpt = document.createElement("label");
      labelOpt.for = "options";
      const newB2 = document.createElement("b");
      newB2.textContent = "Opciones";
      labelOpt.append(newB2);
      prop.append(labelOpt);
      const inputOpt1 = document.createElement("input");
      inputOpt1.type = "text";
      inputOpt1.className = "form-control";
      inputOpt1.placeholder = "Opcion 1";
      prop.append(inputOpt1);
      const inputOpt2 = document.createElement("input");
      inputOpt2.type = "text";
      inputOpt2.className = "form-control";
      inputOpt2.placeholder = "Opcion 2";
      prop.append(inputOpt2);
      const div2 = document.createElement("div");
      div2.id = "newOpts" + auxprop;
      prop.append(div2);
      /**  const newBtn = document.createElement("button");
    newBtn.type = "button";
    newBtn.className ="btn btn-dark";
    newBtn.id = "optionbtn"+ auxprop;
    newBtn.onclick = {addOption};
    newBtn.textContent = "Add option";
    prop.append(newBtn);**/
      document.getElementById("newProp").append(prop);
    } else {
      alert("no me permiten mas propuestas");
    }
  };

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
          class="form-control"
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
          class="form-control"
          type="date"
          placeholder="MM/DD/AAAA"
          name="startDate"
          id="startDate"
        />

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
          class="form-control"
          type="date"
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
          class="form-control"
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
          class="form-control"
          placeholder="Edad maxima"
          name="maxAge"
          id="maxAge"
        ></input>

        <hr></hr>
        <label for="city">
          <b>Ciudad</b>
        </label>
        <input
          type="text"
          class="form-control"
          placeholder="Ciudad"
          name="city"
          id="city"
        ></input>

        <hr></hr>
        <label for="country">
          <b>Pais</b>
        </label>
        <input
          type="text"
          class="form-control"
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
          class="form-control"
          placeholder="Propuesta"
          name="proposalName"
          id="proposalName"
        ></input>
        <input
          type="text"
          class="form-control"
          placeholder="Descripcion"
          name="proposalDescription"
          id="proposalDescription"
        ></input>
        <br></br>
        <label for="options">
          <b>Opciones</b>
        </label>
        <input
          type="text"
          class="form-control"
          placeholder="Opcion 1"
          name="optionOne"
          id="optionOne"
        ></input>
        <input
          type="text"
          class="form-control"
          placeholder="Opcion 2"
          name="optionTwo"
          id="optionTwo"
        ></input>
        <br></br>
        <div id="newOpts"></div>
        <div id="newProp"></div>
        <button
          type="button"
          class="btn btn-dark"
          id="optionbtn"
          onClick={addOption}
        >
          Add option
        </button>
        <br></br>
        <button
          type="button"
          class="btn btn-dark"
          id="proposalbtn"
          onClick={addProposal}
        >
          Add proposal
        </button>

        <hr></hr>

        <button type="submit" class="btn btn-outline-dark" id="electionbtn">
          Crear eleccion
        </button>
      </div>
    </form>
  );
}
