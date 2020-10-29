const Election = require("../../models/election");
const User = require("../../models/user");

const getElectionModel = async (
  { createdBy, name, startDate, endDate, minAge, maxAge, city, country },
  { credentials }
) => {
  return new Election({
    createdBy: credentials.id, //credentials.id,
    name: name,
    startDate: startDate,
    endDate: endDate,
    minAge: minAge,
    maxAge: maxAge,
    city: city,
    country: country,
    isActive: true,
  });
};

const parseElection = ({
  _id,
  createdBy,
  name,
  country,
  city,
  startDate,
  endDate,
  isActive,
  minAge,
  maxAge,
}) => {
  return {
    id: _id || undefined,
    createdBy: createdBy,
    name: name,
    country: country,
    city: city,
    startDate: startDate,
    endDate: endDate,
    isActive: isActive,
    minAge: minAge,
    maxAge: maxAge,
  };
};

module.exports = {
  getElectionModel,
  parseElection,
};
