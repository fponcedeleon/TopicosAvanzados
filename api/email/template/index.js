const fs = require('fs');
const path = require('path');

const getTemplate = (userName, electionName, endDate, electionLink) => {
  const file = fs.readFileSync(path.resolve(__dirname, 'template.txt'));
  let stringFile = file.toString();

  stringFile = stringFile.replace('{Name}', userName);
  stringFile = stringFile.replace('{ElectionName}', electionName);
  stringFile = stringFile.replace('{EndDate}', endDate);
  stringFile = stringFile.replace('{ElectionLink}', electionLink);

  return stringFile;
};

module.exports = {
  getTemplate,
};
