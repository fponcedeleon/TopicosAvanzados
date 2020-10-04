import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css';
import data from '../data.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
export default function VotingPage() {
  
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
                  {data.election.map(election =>
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