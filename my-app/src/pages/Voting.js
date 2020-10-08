import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import '../App.css';
import '../constants/apiRoutes';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import axios from "axios";
// import {useSelector, useDispatch} from "react-redux";
import { ListProposal } from '../components/proposal/ListProposal';
import { listElections } from '../actions/electionActions';


export default function VotingPage() {
  
  const [elections, setElection] = useState([])
  // const electionList = useSelector(state => state.electionList); 
  const electionList = listElections();
  const {election, loading, error} = electionList;
   
  useEffect(() =>{
      // dispatch(listElections);
      return () =>{

      };
    },[]
  )
  return <div className="grid-votaciones">
          <div className="col-md-2"></div>
          <div className="col-md-10">
          <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                </tr>
              </thead>
              <tbody>
                  {elections.map(election =>
                    <tr>
                        <th scope="row"><Link to={"/VotingDetails/" + election.id}>{election.id}</Link></th>
                        <td>{election.name}</td>
                    </tr>
                    )}
              </tbody>
            </table>
          </div>
        </div>
;
}