import React, {useState} from 'react';
import data from '../data.js'; 
import '../index.css';
import {OpenProposal} from "../components/proposal/OpenProposal";
import {ListProposal} from "../components/proposal/ListProposal";
import Container from '@material-ui/core/Container'



function VotingDetails(props) {  
    const election = data.election.find(x => x.id == props.match.params.id)
    const propouse = data.propouses.filter(x => x.electionId == election.id)
 
    const [propouses , setPropouse] = useState(
        data.propouses.filter(x => x.electionId == election.id)
    )
     
    function ShowProposal(propouseParam, functionParam)
    {
        switch (propouseParam.type) {
            case 1: return <OpenProposal propouse={{propouseParam}} funcionGetValue={functionParam}/> 
            case 2: return <ListProposal propouse={{propouseParam}} funcionGetValue={functionParam}/>
            default: return <OpenProposal/>
        }
    }

    const GetValueOfOpen = (index, event) => {
        const values = [...propouses];
        values[index][event.target.name] = event.target.value;
        setPropouse(values);
    } 

    return <Container>
        <form>
            <div className="voting-Details">
            <div className="row">
                <div className="details-middle">

                    <div className="custom-row"> 
                        <label>Nombre</label>
                        <input readOnly="true" type="text" class="form-control" aria-describedby="emailHelp" value={election.name} />
                    </div>

                    <div className="custom-row"> 
                        <label>Descripcion</label>
                        <textarea readOnly="true" class="form-control" id="exampleFormControlTextarea1" rows="3" value={election.description}></textarea>
                    </div>

                    <div className="custom-row"> 
                        <label>Plazo</label>
                        <input readOnly="true" class="form-control" type="date" value="2020-12-31" id="example-date-input" />
                    </div> 
                    
                    {propouses.map((p, index) => 
                       <div>{ShowProposal(p, event => GetValueOfOpen(index, event))}  </div>
                    )}

                    <div className="custom-row"> 
                        <button type="button" class="form-control" onClick="EnviarDatos">Enviar Respuesta</button>
                    </div>
                    
                </div>
            </div>
            
        </div>
        </form>
    </Container>
}

export default VotingDetails;

