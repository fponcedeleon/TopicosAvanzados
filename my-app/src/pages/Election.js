import React from "react";
import "../App.css";
import { createNewElection } from "../scripts/services/election.js";

export default function Services() {
  const handleSumbit = async (event) => {
    event.preventDefault();
    const startDate = event.target.startDate.value;
    const endDate = event.target.endDate.value;
    const minAge = event.target.minAge.value;
    const maxAge = event.target.maxAge.value;
    const city = event.target.city.value;
    const country = event.target.country.value;

    await createNewElection(
      "",
      startDate,
      endDate,
      minAge,
      maxAge,
      city,
      country
    );
  };
  return (
    <form id="generateElection" onSubmit={handleSumbit}>
      <div class="container">
        <h1 className="election">Eleccion</h1>
        <p>Llene este formulario para crear una eleccion.</p>
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

        <button type="submit" class="electionbtn">
          Crear eleccion
        </button>
      </div>
    </form>
  );
}
