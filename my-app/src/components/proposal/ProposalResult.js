/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { getAllProposalOptions } from "../../scripts/services/option";
import "../../index.css";

const ProposalResult = (props) => {
  const [options, setOption] = useState([]);

  const id = props.proposalId;
  const name = props.proposalName;

  const GetPercent = (option) => {
    return option.votants.length;
  };

  useEffect(() => {
    getAllProposalOptions(id).then(
      (result) => {
        setOption(result);
      },
      (error) => {
        console.error(error);
      }
    );
  }, [id]);

  return (
    <div className="custom-row contenedorCentrado">
      <div className="custom-row">
        <div className="custom-row">
          <div className="col-md-12">
            <h5> {name}</h5>
          </div>
        </div>
        <div className="custom-row">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Opcion</th>
                <th scope="col">Cantidad de votos</th>
              </tr>
            </thead>
            <tbody>
              {options.map((option, index) => (
                <tr key={index}>
                  <td>{option.name}</td>
                  <td>{GetPercent(option)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProposalResult;
