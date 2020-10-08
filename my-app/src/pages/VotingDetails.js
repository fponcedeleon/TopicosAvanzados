import React, { useState, useEffect } from 'react';
import '../index.css';
import { OpenProposal } from "../components/proposal/OpenProposal";
import { ListProposal } from "../components/proposal/ListProposal";
import Container from '@material-ui/core/Container'
import { getAllElectionProposals } from "../scripts/services/proposal";
import { getOnePost } from "../scripts/services/election";
import { voteOption } from "../scripts/services/option";
import { useHistory } from 'react-router-dom';



function VotingDetails(props) {

  let selectedOptions = {};

  const [election, setElection] = useState({});
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const electionId = props.match.params.id;
    console.log(electionId);
    getOnePost(electionId)
      .then(
        (result) => {
          console.log(result);
          setElection(result);
        },
        // Nota: es importante manejar errores aquí y no en 
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          console.log(error);
        }
      )
    getAllElectionProposals(electionId).then(
      (result) => {
        console.log(result);
        setProposals(result);
      },
      // Nota: es importante manejar errores aquí y no en 
      // un bloque catch() para que no interceptemos errores
      // de errores reales en los componentes.
      (error) => {
        console.log(error);
      }
    )
    // proposals.forEach(p => {
    //   const idP = p._id;
    //   selectedOptions[idP] = 
    // })
  }, [])

  // const election = data.election.find(x => x.id == props.match.params.id)
  // const propouse = data.propouses.filter(x => x.electionId == election.id)

  // const [propouses , setPropouse] = useState(
  //     data.propouses.filter(x => x.electionId == election.id)
  // )

  function ShowProposal(propouseParam, functionParam) {
    const history = useHistory();
    return <div></div>//<ListProposal propouse={{ propouseParam }} funcionGetValue={functionParam} />
    // switch (propouseParam.type) {
    //   case 1: return <OpenProposal propouse={{ propouseParam }} funcionGetValue={functionParam} />
    //   case 2: return <ListProposal propouse={{ propouseParam }} funcionGetValue={functionParam} />
    //   default: return <ListProposal propouse={{ propouseParam }} funcionGetValue={functionParam} />
    // }
  }

  const GetValueOfOpen = () => {
    // const values = [...propouses];
    // values[index][event.target.name] = event.target.value;
    // setPropouse(values);
    console.log('fede');
  }

  if (!election || !proposals) {
    return <div></div>;
  }

  const handleChange = (event, id) => {

    console.log(event.target.value);
    console.log(id);
    
    selectedOptions[id] = event.target.value;
    console.log(selectedOptions[id]);
  }

  const handleSubmit = () => {

    for (const key in selectedOptions) {
      console.log('optionid' + selectedOptions[key]);
      voteOption(selectedOptions[key], '5f766c4c5c33392600cc824e').then();
    }

    alert('Has votado correctamente.');
  }

  return <Container>
    <form onSubmit={handleSubmit} >
      <div className="voting-Details">
        <div className="row">
          <div className="details-middle">

            <div className="custom-row">
              <label>Nombre</label>
              <input readOnly="true" type="text" class="form-control" aria-describedby="emailHelp" value={election.name} />
            </div>


            {proposals.map((p, index) =>
              <div>
                <ListProposal proposalName={p.name} proposalId={p._id} funcionGetValue={GetValueOfOpen()} handleChange={handleChange}/>
              </div>
            )}

            {/* <div className="custom-row">
              <label>Plazo</label>
              <input readOnly="true" class="form-control" type="date" value="2020-12-31" id="example-date-input" />
            </div> */}

            {/* {propouses.map((p, index) =>
              <div>{ShowProposal(p, event => GetValueOfOpen(index, event))}  </div>
            )} */}

            <div className="custom-row">
              <button type="submit" class="form-control">Enviar Respuesta</button>
            </div>
          </div>
        </div>

      </div>
    </form>
  </Container>
}

export default VotingDetails;

