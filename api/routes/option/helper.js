const Option = require('../../models/option');

const getOptionModel = async (
    { proposalId, name, votants },
    { credentials },
) => {
    return new Option({
        proposalId: proposalId,
        name: name,
        votants: votants || [],
    });
};

const parseOption = ({
    _id,
    name,
    votants,
    proposalId,
}) => {
    return {
        id: _id || undefined,
        name: name,
        proposalId: proposalId,
        votants: votants || [],
    };
};

module.exports = {
    getOptionModel,
    parseOption
}