import React, { useEffect, useState } from "react";
import ProposalResult from "../components/proposal/ProposalResult";
import { getAllElectionProposals } from "../scripts/services/proposal";
import { getOnePost } from "../scripts/services/election";
import "../App.css";

export default function VotingResult(props) {
  const [election, setElection] = useState({});
  const [proposals, setProposals] = useState([]);

  const electionId = props.match.params.id;

  useEffect(() => {
    getOnePost(electionId).then(
      (result) => {
        setElection(result);
      },
      (error) => {
        console.log(error);
      }
    );

    getAllElectionProposals(electionId).then(
      (result) => {
        setProposals(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [electionId]);
  console.log(election)
  return (
    <div>
      <div className="row">
        <div className="details-middle contenedorCentrado">
          <div className="custom-row">
            <h2>Eleccion: {election.name}</h2>
          </div>

          {proposals.map((p, index) => (
            <div>
              <ProposalResult proposalName={p.name} proposalId={p._id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
