import React, {useState} from 'react';
import data from '../data.js'; 
import '../index.css';
import {OpenProposal} from "../components/proposal/OpenProposal";
import {ListProposal} from "../components/proposal/ListProposal";
import Container from '@material-ui/core/Container'

function VotingDetails(props) {  
    const election = data.election.find(x => x.id == props.match.params.id)
    const propouse = data.propouses.filter(x => x.electionId == election.id)
 
    function ShowProposal(propouseParam)
    {
        switch (propouseParam.type) {
            case 1: return <OpenProposal propouse={{propouseParam}} funcionGetValue={GetValueOfOpen}/> 
            case 2: return <ListProposal propouse={{propouseParam}} funcionGetValue={GetValueOfList}/>
            default: return <OpenProposal/>
        }
    }


    function GetValueOfList(values)
    {
        console.log(values.target.value)
        console.log(values.target.getAttribute("data-attrId"))
    }

    function GetValueOfOpen(values)
    { 
        console.log(values.target.value)
        console.log(values.target.getAttribute("data-attrId"))
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
                    
                    {propouse.map(p =>
                       <div>{ShowProposal(p)}  </div>
                    )}
 

                    <div className="custom-row"> 
                        <button type="button" class="form-control">Enviar Respuesta</button>
                    </div>
                    
                </div>
            </div>
            
        </div>
        </form>
    </Container>
}

export default VotingDetails;

