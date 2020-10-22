
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import ProposalResult from "../components/proposal/ProposalResult";
import { getAllElectionProposals } from "../scripts/services/proposal";
import { getOnePost } from "../scripts/services/election";
import { voteOption } from "../scripts/services/option";
import '../App.css';


export default function VotingResult(props) {

  const [election, setElection] = useState({});
  const [proposals, setProposals] = useState([]);

  const electionId = props.match.params.id;

  useEffect(() => {

    getOnePost(electionId)
      .then(
        (result) => {
          setElection(result);
        },
        (error) => {
          console.log(error);
        }
      )

    getAllElectionProposals(electionId).then(
      (result) => {
        setProposals(result);
      },
      (error) => {
        console.log(error);
      }
    )

  }, [electionId])
   

    return <div> 
        
        <div className="row">
          <div className="details-middle contenedorCentrado">

            <div className="custom-row"> 
                <h2>Nombre Eleccion: {election.name} </h2> 
            </div>


            {proposals.map((p, index) =>
              <div>
                <ProposalResult proposalName={p.name} proposalId={p._id}/>
              </div>
            )}
            
          </div>
        </div>
        
         </div>

}
