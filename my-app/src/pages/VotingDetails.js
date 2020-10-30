import React, { useState, useEffect } from "react";
import "../index.css";
import { ListProposal } from "../components/proposal/ListProposal";
import Container from "@material-ui/core/Container";
import { getAllElectionProposals } from "../scripts/services/proposal";
import { getOnePost } from "../scripts/services/election";
import { voteOption } from "../scripts/services/option";
import { getToken, deleteToken } from "../scripts/services/auth";
import { getCurrent } from "../scripts/services/user";

const VotingDetails = (props) => {
  let tokenApi;
  const checkToken = async () => {
    const urlP = new URLSearchParams(window.location.search);
    const token = urlP.get("token");
    tokenApi = await getToken(token);
    if (tokenApi[0]) {
      return true;
    } else {
      return false;
    }
  };

  let selectedOptions = {};

  const [election, setElection] = useState({});
  const [proposals, setProposals] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const electionId = props.match.params.id;

  useEffect(() => {
    getCurrent().then(res => {
      if (res && res.credentials) {
        setCurrentUser(res.credentials);
      }
    })
    checkToken().then((result) => {
      if (!result) window.location = "/home";
    });
    getOnePost(electionId).then(
      (result) => {
        setElection(result);
      },
      (error) => {
        //console.log(error);
      }
    );
    getAllElectionProposals(electionId).then(
      (result) => {
        setProposals(result);
      },
      (error) => {
        //console.log(error);
      }
    );
  }, [electionId]);

  const GetValueOfOpen = () => {
    //console.log("fede");
  };

  if (!election || !proposals) {
    return <div></div>;
  }

  const handleChange = (event, id) => {
    selectedOptions[id] = event.target.value;
  };

  const handleSubmit = async () => {
    if (window.confirm("Confirma las opciones votadas?")) {
      for (const key in selectedOptions) {
        voteOption(selectedOptions[key], currentUser.id).then();
      }
      
      alert("Has votado correctamente.");
      await deleteToken(tokenApi[0]._id);
    }
  };

  return (
    <Container>
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

              {proposals.map((p) => (
                <div>
                  <ListProposal
                    proposalName={p.name}
                    proposalId={p._id}
                    funcionGetValue={GetValueOfOpen()}
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
    </Container>
  );
};

export default VotingDetails;
