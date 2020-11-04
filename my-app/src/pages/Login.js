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
        window.location.href = '/home';
      } else {
        alert("Credenciales incorrectas");
      }
      // setIsLoading(false);
    })
    .catch((error) => {
      setIsLoading(false);
      console.error(error);
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
            <label className="titleHome">Sign in</label>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="userText"
                placeholder="User"
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
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Link to="/forgotPassword">¿Olvidó su contraseña?</Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Button
              className="buttonSignin"
              type="submit"
              onClick={() => LoginApp()}
            >
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </form>}
    </>
  );
}
