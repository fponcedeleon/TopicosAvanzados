import React, { Component } from "react";
import "../../index.css";
import { getAllProposalOptions } from "../../scripts/services/option";

export class ListProposal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const id = this.props.proposalId;
    getAllProposalOptions(id).then(
      (result) => {
        const event = { target: { value: result[0]._id } };
        this.props.handleChange(event, id);
        this.setState({
          data: result,
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  render() {
    const id = this.props.proposalId;
    const name = this.props.proposalName;
    return (
      <div className="custom-row">
        <div>{name}</div>
        <div className="custom-row">
          <select
            className="form-control"
            data-attrId={id}
            onChange={(event) => this.props.handleChange(event, id)}
          >
            {this.state.data.map((option, index) => {
              return (
                <option key={index} value={option._id}>
                  {option.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  }
}
