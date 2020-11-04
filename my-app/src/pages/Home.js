/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { getAllElections } from "../scripts/services/election";
import Loading from "../components/Loading";

export default function Services() {
  const [data, setData] = useState([]);
  const [dataClosed, setDataClosed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let closedElections = [];
  const dataClosedLength = dataClosed && dataClosed.length;

  useEffect(() => {
    getAllElections().then(
      (result) => {
        for (let index = 0; index < result.length; index++) {
          if (!result[index].isActive) closedElections.push(result[index]);
        }
        setDataClosed(closedElections);
        setData(result);
        
      },
      // Nota: es importante manejar errores aquí y no en
      // un bloque catch() para que no interceptemos errores
      // de errores reales en los componentes.
      (error) => {
        console.error(error);
        setIsLoading(false);
      }
    )
    .then(() => setIsLoading(false));
  }, [dataClosedLength, closedElections, isLoading]);

  if (!data) {
    return <div></div>;
  }
  if (!dataClosed) {
    return <div></div>;
  }

  return (
    <>
    {isLoading && <Loading />}
    {!isLoading && <div className="grid-votaciones">
      <div className="col-md-2"></div>
      <div className="col-md-10">
        <div className="custom-row">
          <div className="col-md-12">
            <h2> Votaciones Cerradas </h2>
          </div>
        </div>
        <div className="custom-row">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
              </tr>
            </thead>
            <tbody>
              {dataClosed &&
                dataClosed.map((election, index) => (
                  <tr key={index}>
                    <th scope="row">
                      <Link to={"/VotingResult/" + election._id}>
                        {election._id}
                      </Link>
                    </th>
                    <td>{election.name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    }
    </>
  );
}
