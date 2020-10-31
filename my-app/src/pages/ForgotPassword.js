import React from "react";
//import { sendEmail } from "../scripts/services/auth.js";

export default function ForgotPassword() {
  const subject = "Recuperacion de contraseña";
  const mailBody =
    "<p>Recupere su contraseña <a href='http://localhost:3000/changePassword:'>aqui</a></p>";
  const handleSumbit = async (event) => {
    console.log(document.getElementById("inputMail").value);
    event.preventDefault();
    //sendEmail(subject,document.getElementById("inputPassword").value,mailBody);
    alert("Se le ha enviado un correo para cambiar su contraseña");
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
