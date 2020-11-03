import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Election from "./pages/Election";
import Voting from "./pages/Voting";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import VerifyAccount from "./pages/VerifyAccount";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
// eslint-disable-next-line
import { Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import VotingDetails from "./pages/VotingDetails";
import VotingResult from "./pages/VotingResult";
import { getCurrent } from "./scripts/services/user";
import Register from "./pages/Register";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    getCurrent()
      .then((res) => setIsAuthenticated(res && res.credentials))
      .catch(() => setIsAuthenticated(false));
  }, []);
  
  return (
    <BrowserRouter>
      <Navbar isAuthenticated={isAuthenticated} />
      <Route path="/home" exact component={Home} />
      <Route path="/error" exact component={Error} />

      {!isAuthenticated && (
        <React.Fragment>
          <Route path="/" exact component={Login} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/verify" component={VerifyAccount} />
          <Route path="/forgotPassword" component={ForgotPassword} />
          <Route path="/resetPassword" component={ResetPassword} />
        </React.Fragment>
      )}
      {isAuthenticated && (
        <React.Fragment>
          <Route path="/" exact component={Home} />
          <Route path="/election" component={Election} />
          <Route path="/voting" component={Voting} />
          <Route path="/votingdetails/:id" component={VotingDetails} />
          <Route path="/votingresult/:id" component={VotingResult} />
        </React.Fragment>
      )}
    </BrowserRouter>
  );
}

export default App;
