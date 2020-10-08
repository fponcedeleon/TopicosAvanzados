import React, { Component, useEffect, useState } from 'react';
import { render } from 'react-dom';
import '../../index.css';
// import data from '../../data.js'; 
import { getAllProposalOptions } from "../../scripts/services/option";




export class ListProposal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    const id = this.props.proposalId;
    getAllProposalOptions(id)
        .then(
          (result) => {
            console.log(result);
            this.setState({
              data: result
            });

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
  }

  render() {
    console.log(this.state.data);
    // const [data, setData] = useState([]);
    // let data = [];
      const id = this.props.proposalId;
      // console.log('id' + id);
      // getAllProposalOptions(id)
      //   .then(
      //     (result) => {
      //       console.log(result);
      //       data = result;
      //       // setData(result);
      //     },
      //     // Nota: es importante manejar errores aquí y no en 
      //     // un bloque catch() para que no interceptemos errores
      //     // de errores reales en los componentes.
      //     (error) => {
      //       console.log(error);
      //     }
      //   )
    

    const name = this.props.proposalName
    // const funcionRetorno = this.props.funcionGetValue
    // const options = data.opciones.filter(x => x.idPropouse == propouse.id)
    return <div className="custom-row" >
      <div>{name}</div>
      <div className="custom-row" >
        <select class="form-control" data-attrId={id} onChange={(event) => this.props.handleChange(event, id)} >
          {this.state.data.map(option => { 
            console.log(option);
            return <option value={option._id} >{option.name}</option>}
          )}
        </select>
      </div>
    </div>
  }
}