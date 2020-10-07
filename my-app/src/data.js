export default {
election: [
    {
      id: '1',
      name: 'Futbol Uruguayo',
      description: 'Usted se considera crack del futbol uruguayo? Considera que plaza colonia merece el titulo?',
      proposesId: 1
    },
    {
      id: '2',
      name: 'Eleccion estatica 2',
      description: 'Esta es la descripcion de la eleccion numero 2',
      proposesId: 2
    }
],
propouses:[
  {
    id: 1,
    type: 1,
    name: 'Justifique por que Wanders es el mejor cuadro uruguayo',
    electionId: 1
  },
  {
    id: 2,
    type: 2,
    name: 'Quien es el mejor cuadro actual del futbol uruguayo',
    electionId: 1
  },
  {
    id: 3,
    type: 1,
    name: 'Que cualidades tiene el equipo al que eligio',
    electionId: 1
  },
  {
    id: 4,
    type: 2,
    name: 'Recomienda esta encuesta?',
    electionId: 1
  },
],
opciones: [
  { 
    id:1,
    idPropouse: 2,
    valor: "Torque"
  },
{ 
  id:2,
  idPropouse: 2,
  valor: "Defensor"
},{ 
  id:3,
  idPropouse: 2,
  valor: "Fenix"
},
{ 
  id:4,
  idPropouse: 2,
  valor: "Ninguno"
},
{ 
  id:5,
  idPropouse: 4,
  valor: "Si"
},
{ 
  id:6,
  idPropouse: 4,
  valor: "'No' quiere poner el boton"
}
]

}