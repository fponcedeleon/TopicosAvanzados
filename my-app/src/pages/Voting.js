import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import '../App.css';
import { getAllElections } from "../scripts/services/election";

export default function VotingPage() {

  const [data, setData] = useState([]);

  useEffect(() => {
    getAllElections()
      .then(
        (result) => {
          console.log(result);
          setData(result);
        },
        // Nota: es importante manejar errores aquí y no en 
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          console.log(error);
        }
      )
  }, [])

  if (!data) {
    console.log(data);
    return <div></div>;
  }

  return <div className="grid-votaciones">
          <div className="col-md-2"></div>
          <div className="col-md-10">
          <div className="custom-row">
                <div className="col-md-12">
                      <h2> Votaciones Abiertas </h2>
                    </div>
                </div>
                <div className="custom-row">
                <table class="table">
                    <thead class="thead-dark">
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                      </tr>
                    </thead>
                    <tbody>
                        {data && data.map(election =>
                          <tr>
                              <th scope="row"><Link to={"/VotingDetails/" + election._id}>{election._id}</Link></th>
                              <td>{election.name}</td>
                          </tr>
                          )}
                    </tbody>
                  </table>
                </div> 

            <div className="custom-row">
                <div className="col-md-12">
                      <h2> Votaciones Cerradas </h2>
                    </div>
                </div>
                <div className="custom-row">
                  <table class="table">
                      <thead class="thead-dark">
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Nombre</th>
                        </tr>
                      </thead>
                      <tbody>
                          {data && data.map(election =>
                            <tr>
                                {console.log("ELECTIO: " + election._id)}
                                <th scope="row"><Link to={"/VotingResult/" + election._id}>{election._id}</Link></th>
                                <td>{election.name}</td>
                            </tr>
                            )}
                      </tbody>
                    </table>
                </div>
          </div> 
        </div> 
;
}