import React, { useEffect, useState } from 'react';
import { getAllProposalOptions } from "../../scripts/services/option";
import { getOnePost } from "../../scripts/services/proposal";
import {render} from 'react-dom';
import '../../index.css';

 
const ProposalResult = (props) => {

    const [options, setOption] = useState([]);
    const [proposal, setProposal] = useState([]);

    const id = props.proposalId;
    const name = props.proposalName;

    const GetPercent = (id) =>
    {
      
    }

    useEffect(() => {
      getAllProposalOptions(id)
        .then(
          (result) => {
            setOption(result);
          },
          (error) => {
            console.log(error);
          }
        )
        getOnePost(id).then(
          (result) => { 
            setProposal(result);
          },
          (error) => {
            console.log(error);
          }
        )
    }, [id])
    
    return <div className="custom-row" >
                <div>{name}</div>
                <div className="custom-row" >
                
                 <div className="custom-row">
                    <div className="col-md-12">
                      <h2> {name}</h2>
                    </div>
                 </div>
                  <div className="custom-row">
                    <table class="table">
                        <thead class="thead-dark">
                          <tr>
                            <th scope="col">Opcion</th>
                            <th scope="col">Porcentaje</th>
                          </tr>
                        </thead>
                        <tbody>
                            {options.map(option =>
                              <tr>
                                  <td>{option.name}</td>
                                  <td>{GetPercent(option.id)}</td>
                              </tr>
                              )}
                        </tbody>
                      </table>
                  </div>
                </div>
            </div>
    }

    export default ProposalResult;
