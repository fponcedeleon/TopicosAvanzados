/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "../index.css";
import { ListProposal } from "../components/proposal/ListProposal";
import Container from "@material-ui/core/Container";
import { getAllElectionProposals } from "../scripts/services/proposal";
import { getOnePost } from "../scripts/services/election";
import { voteOption } from "../scripts/services/option";
import { getToken, deleteToken } from "../scripts/services/auth";
import { getCurrent } from "../scripts/services/user";
import Loading from "../components/Loading";

const VotingDetails = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(true);

  let selectedOptions = {};

  const [election, setElection] = useState({});
  const [proposals, setProposals] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const electionId = props.match.params.id;

  useEffect(() => {
    if (election) return;

    const urlP = new URLSearchParams(window.location.search);
    const urlToken = urlP.get("token");
    Promise.all([
    getToken(urlToken)
      .then(response => {
        if (!response) {
          window.location.href = '/error';
        }
        else {
          setToken(response[0]);
        }
      })
      .then(() => {
        getCurrent().then(res => {
          if (res && res.credentials) {
            setCurrentUser(res.credentials);
          }
        })
          .then(() => {
            getOnePost(electionId).then(
              (result) => {
                setElection(result);
              },
              (error) => {
                console.error(error);
              }
            ).then(() => {
              getAllElectionProposals(electionId).then(
                (result) => {
                  setProposals(result);
                },
                (error) => {
                  console.error(error);
                }
              )
            })
          })

      })])
      .then(() => setIsLoading(false));
  }, [electionId, election, isLoading]);

  if (!election || !proposals) {
    return <div></div>;
  }

  const handleChange = (event, id) => {
    selectedOptions[id] = event.target.value;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (window.confirm("Confirma las opciones votadas?")) {
      for (const key in selectedOptions) {
        voteOption(selectedOptions[key], currentUser.id).then();
      }

      alert("Has votado correctamente.");
      await deleteToken(token._id);
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && <Container>
        <form>
          <div className="voting-Details">
            <div className="row">
              <div className="details-middle">
                <div className="custom-row">
                  <label>Nombre</label>
                  <input
                    readOnly="true"
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    value={election.name}
                  />
                </div>

                {proposals.map((p, index) => (
                  <div key={index}>
                    <ListProposal
                      proposalName={p.name}
                      proposalId={p._id}
                      handleChange={handleChange}
                    />
                  </div>
                ))}

                <div className="custom-row">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="form-control"
                  >
                    Enviar Respuesta
                </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Container>}
    </>);
};

export default VotingDetails;
