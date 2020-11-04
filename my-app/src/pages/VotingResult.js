import React, { useEffect, useState } from "react";
import ProposalResult from "../components/proposal/ProposalResult";
import { getAllElectionProposals } from "../scripts/services/proposal";
import { getOnePost } from "../scripts/services/election";
import "../App.css";
import Loading from "../components/Loading";

export default function VotingResult(props) {
  const [election, setElection] = useState({});
  const [proposals, setProposals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const electionId = props.match.params.id;

  useEffect(() => {
    getOnePost(electionId).then(
      (result) => {
        setElection(result);
      },
      (error) => {
        console.error(error);
      }
    )
    .then(() => {
      getAllElectionProposals(electionId).then(
        (result) => {
          setProposals(result);
        },
        (error) => {
          console.error(error);
        }
      );
  
      setIsLoading(false);
    })
  }, [electionId, isLoading]);
  return (
    <>
    {isLoading && <Loading />}
    {!isLoading && <div>
      <div className="row">
        <div className="details-middle contenedorCentrado">
          <div className="custom-row">
            <h2>Eleccion: {election.name}</h2>
          </div>

          {proposals.map((p, index) => (
            <div key={index}>
              <ProposalResult proposalName={p.name} proposalId={p._id} />
            </div>
          ))}
        </div>
      </div>
    </div>}
  </>);
}
