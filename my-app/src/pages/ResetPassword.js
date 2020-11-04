/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { getToken, deleteToken } from "../scripts/services/auth";
import { getUserById, changePassword } from "../scripts/services/user";
import Loading from "../components/Loading";

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const handleSumbit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const password = document.getElementById("inputPassword").value;
    if (password === document.getElementById("inputPasswordConfirm").value) {
      await changePassword(user._id, password);
      await deleteToken(token._id);
      setIsLoading(false);
      alert("se ha cambiado la contraseña");
    } else {
      setIsLoading(false);
      alert("Las contraseñas no coinciden");
    }
  };
  
  useEffect(() => {
    if (!token) {
      const urlP = new URLSearchParams(window.location.search);
      const urlToken = urlP.get("token");
      getToken(urlToken)
        .then(response => {
          if (response && response[0]) {
            getUserById(response[0].userId)
              .then(u => {
                if (u) {
                  setUser(u);
                  setToken(response[0]);
                }
                else {
                  window.location.href = '/error';
                }
              })
          }
        })
        .catch (e => window.location.href = '/error')
        .finally(() => setIsLoading(false));
    }
  }, [token, isLoading]);

  return (
    <>
    {isLoading && <Loading />}
    {!isLoading && <form id="resetPassword" onSubmit={handleSumbit}>
      <div className="container">
        <h1 className="forgotTitle">Cambiar contraseña</h1>
        <label className="lbpassword">
          <b>Escriba una nueva contraseña</b>
        </label>
        <input
          type="password"
          placeholder="Contraseña"
          className="form-control  col-md-6"
          name="inputPassword"
          id="inputPassword"
          required
        ></input>
        <br></br>
        <input
          type="password"
          placeholder="Confirmar contraseña"
          className="form-control  col-md-6"
          name="inputPasswordConfirm"
          id="inputPasswordConfirm"
          required
        ></input>
        <hr></hr>
        <button type="submit" className="btn btn-outline-dark">
          Cambiar
        </button>
      </div>
    </form>}
    </>
  );
}
