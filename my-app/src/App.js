import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Election from "./pages/Election";
import Voting from "./pages/Voting";
import Home from "./pages/Home";
import VerifyAccount from "./pages/VerifyAccount";
// eslint-disable-next-line
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";
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
      <Route path="/" exact component={Home} />
      {isAuthenticated && (
        <React.Fragment>
          <Route path="/election" component={Election} />
          <Route path="/voting" component={Voting} />
          <Route path="/votingdetails/:id" component={VotingDetails} />
          <Route path="/votingresult/:id" component={VotingResult} />
        </React.Fragment>
      )}
      {!isAuthenticated && (
        <React.Fragment>
          {/* <Route path='/login' component={Login} /> */}
          <Route path="/register" component={Register} />
          <Route path="/verify" component={VerifyAccount} />
        </React.Fragment>
      )}
    </BrowserRouter>
  );
}

export default App;
