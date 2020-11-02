import React from "react";
import {
  createNewToken,
  forgotPasswordEmail,
} from "../scripts/services/auth.js";
import { getUserByEmail } from "../scripts/services/user.js";

// const baseUrl =
//   process.env.NODE_ENV === "localhost"
//     ? "http://localhost:3000"
//     : process.env.ENVIRONMENT === "test"
//     ? "https://topicos2020testing.netlify.app"
//     : "https://topicos2020.netlify.app";
const baseUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://topicos2020.netlify.app";

export default function ForgotPassword() {
  const generateNewLink = async (id) => {
    const token = await createNewToken(null, id);
    return `${baseUrl}/resetPassword?token=${token.data.token}`;
  };

  const handleSumbit = async (event) => {
    event.preventDefault();
    const subject = "Restablecer contraseña";
    const userEmail = document.getElementById("inputMail").value;
    const user = await getUserByEmail(userEmail);
    const link = await generateNewLink(user._id);
    forgotPasswordEmail(userEmail, link, subject);
    alert("Se le ha enviado un correo para restablecer su contraseña");
  };

  return (
    <form id="forgotPassword" onSubmit={handleSumbit}>
      <div class="container">
        <h1 className="forgotTitle">Recuperar contraseña</h1>
        <label className="Email">
          <b>Mail</b>
        </label>
        <input
          type="text"
          placeholder="correo@ejemplo.com"
          class="form-control  col-md-6"
          name="inputMail"
          id="inputMail"
          required
        ></input>
        <hr></hr>
        <button type="submit" class="btn btn-outline-dark">
          Recuperar
        </button>
      </div>
    </form>
  );
}
