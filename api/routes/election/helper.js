const Election = require('../../models/election');
const User = require('../../models/user');

const getElectionModel = async (
    { startDate, endDate, minAge, maxAge, city, country },
    { credentials },
) => {
    const randomUser = User.find({}).then(r => r);
    return new Election({
        createdBy: randomUser._id,//credentials.id,
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
    parseElection
}