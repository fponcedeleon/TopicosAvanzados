import React from "react";
export default function ResetPassword() {
  const handleSumbit = async (event) => {
    console.log(document.getElementById("inputPassword").value);
    event.preventDefault();
    if (
      document.getElementById("inputPassword").value ==
      document.getElementById("inputPasswordConfirm").value
    ) {
      alert("se ha cambiado la contraseña");
    } else {
      alert("Las contraseñas no coinciden");
    }
  };
  return (
    <form id="resetPassword" onSubmit={handleSumbit}>
      <div class="container">
        <h1 className="forgotTitle">Cambiar contraseña</h1>
        <label className="lbpassword">
          <b>Escriba su contraseña</b>
        </label>
        <input
          type="password"
          placeholder="contraseña"
          class="form-control  col-md-6"
          name="inputPassword"
          id="inputPassword"
          required
        ></input>
        <br></br>
        <input
          type="password"
          placeholder="confirmar contraseña"
          class="form-control  col-md-6"
          name="inputPasswordConfirm"
          id="inputPasswordConfirm"
          required
        ></input>
        <hr></hr>
        <button type="submit" class="btn btn-outline-dark">
          Cambiar
        </button>
      </div>
    </form>
  );
}
