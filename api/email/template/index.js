const fs = require('fs');
const path = require('path');

const getTemplateNewElection = (userName, electionName, endDate, electionLink) => {
  const file = fs.readFileSync(path.resolve(__dirname, 'templateNewElection.txt'));
  let stringFile = file.toString();

  stringFile = stringFile.replace('{Name}', userName);
  stringFile = stringFile.replace('{ElectionName}', electionName);
  stringFile = stringFile.replace('{EndDate}', endDate);
  stringFile = stringFile.replace('{ElectionLink}', electionLink);

  return stringFile;
};

const getTemplateResults = (userName, electionName, resultsLink) => {
  const file = fs.readFileSync(path.resolve(__dirname, 'templateResults.txt'));
  let stringFile = file.toString();

  stringFile = stringFile.replace('{Name}', userName);
  stringFile = stringFile.replace('{ElectionName}', electionName);
  stringFile = stringFile.replace('{ResultsLink}', resultsLink);

  return stringFile;
};

module.exports = {
  getTemplateNewElection,
  getTemplateResults,
};
