import React from 'react';
import data from '../data.js';

function VotingDetails(props) {  
    const election = data.election.find(x => x.id == props.match.params.id)
    return <div className="voting-Details">
        <div className="row">
        <div className="details-middle">
            <div> 
                 <label>Nombre</label>
                 <input type="text" class="form-control" aria-describedby="emailHelp" value={election.name} />
            </div>
            <div> 
                 <label>Descripcion</label>
                 <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={election.description}></textarea>
            </div>
            <div> 
                 <label>Plazo</label>
                 <input class="form-control" type="date" value="2020-12-31" id="example-date-input" />
            </div>
        </div>
        </div>
    </div>
}

export default VotingDetails;

