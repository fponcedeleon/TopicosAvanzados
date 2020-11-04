import React, { useState } from "react";
import {
  createNewToken,
  forgotPasswordEmail,
} from "../scripts/services/auth.js";
import { getUserByEmail } from "../scripts/services/user.js";
import Loading from "../components/Loading";

const baseUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://topicos2020.netlify.app";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const generateNewLink = async (id) => {
    const token = await createNewToken(null, id);
    return `${baseUrl}/resetPassword?token=${token.data.token}`;
  };

  const handleSumbit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const subject = "Restablecer contraseña";
    const userEmail = document.getElementById("inputMail").value;
    const user = await getUserByEmail(userEmail);
    const link = await generateNewLink(user._id);
    forgotPasswordEmail(userEmail, link, subject);
    setIsLoading(false);
    alert("Se le ha enviado un correo para restablecer su contraseña");
  };

  return (
    <>
    {isLoading && <Loading />}
    {!isLoading && <form id="forgotPassword" onSubmit={handleSumbit}>
      <div className="container">
        <h1 className="forgotTitle">Recuperar contraseña</h1>
        <label className="Email">
          <b>Mail</b>
        </label>
        <input
          type="text"
          placeholder="correo@ejemplo.com"
          className="form-control  col-md-6"
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
    }
    </>
  );
}
