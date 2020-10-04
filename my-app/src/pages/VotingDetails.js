import React from 'react';
import data from '../data.js';

function VotingDetails(props) {  
    const election = data.election.find(x => x.id == props.match.params.id)
    return <div className="voting-Details">
        <div className="row">
        <div className="details-middle">
            <div> 
                 <label>Nombre</label>
                 <input type="text" class="form-control" aria-describedby="emailHelp" placeholder={election.name} />
            </div>
        </div>
        </div>
    </div>
}

export default VotingDetails;

