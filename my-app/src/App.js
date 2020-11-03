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
import { Route, BrowserRouter, Switch } from "react-router-dom";
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
      <Switch>
        {!isAuthenticated && (
          <React.Fragment>
            <Route path="/" exact component={Login} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/verify" exact component={VerifyAccount} />
            <Route path="/forgotPassword" exact component={ForgotPassword} />
            <Route path="/resetPassword" exact component={ResetPassword} />
            <Route component={Error} />
          </React.Fragment>
        )}
        {isAuthenticated && (
          <React.Fragment>
            <Route path="/" exact component={Home} />
            <Route path="/election" exact component={Election} />
            <Route path="/voting" exact component={Voting} />
            <Route path="/votingdetails/:id" exact component={VotingDetails} />
            <Route path="/votingresult/:id" exact component={VotingResult} />
            <Route component={Error} />
          </React.Fragment>
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
