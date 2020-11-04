import React, { useEffect, useState } from "react";
import { getToken, deleteToken } from "../scripts/services/auth";
import { getUserById, changePassword } from "../scripts/services/user";
import Loading from "../components/Loading";

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(true);
  let tokenApi = null;
  let user = null;

  const checkToken = async () => {
    const urlP = new URLSearchParams(window.location.search);
    const token = urlP.get("token");
    tokenApi = await getToken(token);
    if (tokenApi[0]) {
      user = await getUserById(tokenApi[0].userId);
      return true;
    } else {
      return false;
    }
  };

  const handleSumbit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const password = document.getElementById("inputPassword").value;
    if (password === document.getElementById("inputPasswordConfirm").value) {
      await changePassword(user._id, password);
      await deleteToken(tokenApi[0]._id);
      setIsLoading(false);
      alert("se ha cambiado la contraseña");
    } else {
      setIsLoading(false);
      alert("Las contraseñas no coinciden");
    }
  };

  useEffect(() => {
    checkToken().then((result) => {
      if (!result) window.location = "/error";
      setIsLoading(false);
    })
  }, [checkToken, isLoading]);

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
