const fs = require("fs");
const path = require("path");
const moment = require("moment")

const getTemplateNewElection = (
  userName,
  electionName,
  endDate,
  electionLink
) => {
  const file = fs.readFileSync(
    path.resolve(__dirname, "templateNewElection.txt")
  );
  let stringFile = file.toString();

  stringFile = stringFile.replace("{Name}", userName);
  stringFile = stringFile.replace("{ElectionName}", electionName);
  stringFile = stringFile.replace("{EndDate}", moment(endDate).format("LLLL"));
  stringFile = stringFile.replace("{ElectionLink}", electionLink);

  return stringFile;
};

const getTemplateResults = (userName, electionName, resultsLink) => {
  const file = fs.readFileSync(path.resolve(__dirname, "templateResults.txt"));
  let stringFile = file.toString();

  stringFile = stringFile.replace("{Name}", userName);
  stringFile = stringFile.replace("{ElectionName}", electionName);
  stringFile = stringFile.replace("{ResultsLink}", resultsLink);

  return stringFile;
};

const getTemplateValidateUser = (userName, link) => {
  const file = fs.readFileSync(path.resolve(__dirname, "validateUser.txt"));
  let stringFile = file.toString();

  stringFile = stringFile.replace("{Name}", userName);
  stringFile = stringFile.replace("{Link}", link);

  return stringFile;
};

const getTemplateForgotPassword = (link) => {
  const file = fs.readFileSync(
    path.resolve(__dirname, "templateForgotPassword.txt")
  );
  let stringFile = file.toString();

  stringFile = stringFile.replace("{Link}", link);

  return stringFile;
};

module.exports = {
  getTemplateNewElection,
  getTemplateResults,
  getTemplateValidateUser,
  getTemplateForgotPassword,
};
