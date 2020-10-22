import React from 'react';
import Navbar from './components/Navbar';
import Election from './pages/Election';
import Voting from './pages/Voting';
import Home from './pages/Home'; 
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom'; 
import './App.css';
import VotingDetails from './pages/VotingDetails';
import VotingResult from './pages/VotingResult';

function App() {
  return (
    <BrowserRouter> 
      <Navbar /> 
      <Route path='/' exact component={Home} />
      <Route path='/election' component={Election} />
      <Route path='/voting' component={Voting} />
      <Route path='/votingdetails/:id' component={VotingDetails} /> 
      <Route path='/votingresult/:id' component={VotingResult} /> 
  </BrowserRouter>
  );
}

export default App;
