/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { setSession } from "../scripts/utils/session";
import catolica from "../Img/cato.jpg";
import logo from "../Img/ucu_logo.png";
import Button from "react-bootstrap/Button";
import { getToken } from "../scripts/services/user";
import Loading from "../components/Loading";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function LoginApp() {
    setIsLoading(true);
    getToken(user, password).then((result) => {
      if (result) {
        setSession(result.result);
        setIsLoading(false);
        window.location.href = '/home';
      } else {
        setIsLoading(false);
        alert("Por favor, verificá que tus credenciales sean correctas");
      }
    })
    .catch((error) => {
      setIsLoading(false);
      alert(error);
    });
  }

  return (
    <>
    {isLoading && <Loading />}
    {!isLoading && <form className="row">
      <div className="col-md-9">
        <img className="imgStyle" src={catolica} alt="Catolica" />
      </div>
      <div className="col-md-3">
        <div className="row">
          <img className="logo" src={logo} alt="Logo" />
        </div>
        <div className="row">
          <div className="col-md-12">
            <label className="titleHome">Iniciar Sesión</label>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="userText"
                placeholder="Nombre de Usuario"
                onChange={(event) => setUser(event.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="passwordText"
                placeholder="Contraseña"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Link to="/forgotPassword">¿Olvidaste la contraseña?</Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Button
              className="buttonSignin"
              type="submit"
              onClick={() => LoginApp()}
            >
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </div>
    </form>}
    </>
  );
}
