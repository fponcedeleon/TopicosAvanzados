import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Election from "./pages/Election";
import Voting from "./pages/Voting";
import ErrorPage from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import VerifyAccount from "./pages/VerifyAccount";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import "./App.css";
import VotingDetails from "./pages/VotingDetails";
import VotingResult from "./pages/VotingResult";
import { getCurrent } from "./scripts/services/user";
import Register from "./pages/Register";
import Loading from "./components/Loading";

const UnauthenticatedApp = () => 
  (
    <>
      <Switch>
        <Route exact path="/" component={() => <Redirect to="/login" />} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/verify/:id" component={VerifyAccount} />
        <Route exact path="/forgotPassword" component={ForgotPassword} />
        <Route exact path="/resetPassword" component={ResetPassword} />
        <Route exact path="/error" component={ErrorPage} />
        <Route path="*" component={() => <Redirect to="/error" />} />
      </Switch>
    </>
  );

const AuthenticatedApp = ({ isAdmin }) => 
  (
    <>
      <Switch>
        <Route exact path="/" component={() => <Redirect to="/home" />} />
        <Route exact path="/home" component={Home} />
        {isAdmin && <Route exact path="/election" component={Election} />}
        <Route exact path="/voting" component={Voting} />
        <Route exact path="/votingdetails/:id" component={VotingDetails} />
        <Route exact path="/votingresult/:id" component={VotingResult} />
        <Route exact path="/votingresult/:id" component={VotingResult} />
        <Route exact path="/error" component={ErrorPage} />
        <Route path="*" component={() => <Redirect to="/error" />} />
      </Switch>
    </>
  );

const RouterNavigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getCurrent()
      .then((res) => {
        setIsAuthenticated(res && res.credentials);
        setIsAdmin(res && res.credentials && res.credentials.role === "standard");
        setIsLoading(false);
      })
      .catch((error) => {
        setIsAuthenticated(false);
        setIsLoading(false);
        console.error(error);
      });
  }, []);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
      {isLoading && <Loading />}
      {!isAuthenticated && !isLoading && <UnauthenticatedApp />}
      {isAuthenticated && !isLoading && <AuthenticatedApp isAdmin={isAdmin} />}      
    </Router>
  );
}

export default function App() {
  return (
    <RouterNavigation />
  );
}
