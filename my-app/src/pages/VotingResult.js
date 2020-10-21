
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import ProposalResult from "../components/proposal/ProposalResult";
import { getAllElectionProposals } from "../scripts/services/proposal";
import { getOnePost } from "../scripts/services/election";
import { voteOption } from "../scripts/services/option";
import '../App.css';


export default function VotingResult() {

  const [election, setElection] = useState({});
  const [proposals, setProposals] = useState([]);
  const [option, setOption] = useState([]);

  const electionId = 1;// props.match.params.id;

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
          <div className="details-middle">

            <div className="custom-row">
              <label>Nombre</label>
              <input readOnly="true" type="text" class="form-control" aria-describedby="emailHelp" value={election.name} />
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
