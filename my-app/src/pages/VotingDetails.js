import React, { useState, useEffect } from "react";
import "../index.css";
import { ListProposal } from "../components/proposal/ListProposal";
import Container from "@material-ui/core/Container";
import { getAllElectionProposals } from "../scripts/services/proposal";
import { getOnePost } from "../scripts/services/election";
import { voteOption } from "../scripts/services/option";
import { getToken, deleteToken } from "../scripts/services/auth";

function VotingDetails(props) {
  const checkToken = async () => {
    const urlP = new URLSearchParams(window.location.search);
    const token = urlP.get("token");
    const tokenApi = await getToken(token);
    if (tokenApi) {
      await deleteToken(tokenApi.data.id);
      return true;
    } else {
      return false;
    }
  };

  if (!checkToken()) {
    //window.location = "/home"; //maybe make a new page showing that the url is invalid
  }

  let selectedOptions = {};

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

  const GetValueOfOpen = () => {
    console.log("fede");
  };

  if (!election || !proposals) {
    return <div></div>;
  }

  const handleChange = (event, id) => {
    selectedOptions[id] = event.target.value;
  };

  const handleSubmit = () => {
    if (window.confirm("Confirma las opciones votadas?")) {
      for (const key in selectedOptions) {
        voteOption(selectedOptions[key], "5f766c4c5c33392600cc824e").then();
      }

      alert("Has votado correctamente.");
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
                  class="form-control"
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
                  class="form-control"
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
}

export default VotingDetails;
