import React, { useEffect, useState } from 'react';
import '../../index.css';
// import data from '../../data.js'; 
import { getAllProposalOptions } from "../../scripts/services/option";


const ListProposal = (props) => {
  const [data, setData] = useState([]);
  const id = props.proposalId;
  const name = props.proposalName;

  useEffect(() => {
    getAllProposalOptions(id)
      .then(
        (result) => {
          setData(result);

          // this.props.handleChange()
          // setData(result);
        },
        // Nota: es importante manejar errores aquí y no en 
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          console.log(error);
        }
      )
  }, [id])

  return <div className="custom-row" >
    <div>{name}</div>
    <div className="custom-row" >
      <select class="form-control" data-attrId={id} onChange={(event) => this.props.handleChange(event, id)} >
        {data.map(option => {
          console.log(option);
          return <option value={option._id} >{option.name}</option>
        }
        )}
      </select>
    </div>
  </div>
}

export default ListProposal;