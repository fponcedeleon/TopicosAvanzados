import React, { Component } from 'react';
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
          },
          (error) => {
            console.log(error);
          }
        )
  }

  render() {
    console.log(this.state.data);
      const id = this.props.proposalId;
    

    const name = this.props.proposalName
    return <div className="custom-row" >
      <div>{name}</div>
      <div className="custom-row" >
        <select class="form-control" data-attrId={id} onChange={(event) => this.props.handleChange(event, id)} >
          {this.state.data.map(option => { 
            return <option value={option._id} >{option.name}</option>}
          )}
        </select>
      </div>
    </div>
  }
}