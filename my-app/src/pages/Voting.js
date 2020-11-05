/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { getAllElections } from "../scripts/services/election";
import Loading from "../components/Loading";
import moment from 'moment';

export default function VotingPage() {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dataLength = data && data.length;
  useEffect(() => {
    getAllElections()
      .then(
        (result) => {
          setData(result);
        },
        // Nota: es importante manejar errores aquí y no en 
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          console.error(error);
        }
      )
      .finally(() => setIsLoading(false));
  }, [dataLength, isLoading])

  if (!data) {
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
          <h2> Votaciones Abiertas </h2>
        </div>
      </div>
      <div className="custom-row">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Nombre</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((election, index) =>
              <tr key={index}>
                <th scope="row"><Link to={"/VotingDetails/" + election._id}>{election.name}</Link></th>
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
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Fecha Cerrada</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((election, index) =>
              <tr key={index}>
                <th scope="row"><Link to={"/VotingResult/" + election._id}>{election.name}</Link></th>
                <th scope="row">{moment(election.endDate).locale("es").format("LLLL")}</th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>}
  </>
  );
}