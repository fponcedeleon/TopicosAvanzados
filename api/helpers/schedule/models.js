const Election = require('../../models/election');

const InactivateElections = async () => {
    const nDate = new Date().toISOString();
    const activeCondition = {
        isActive: true,
        endDate: { $lte: nDate }
    };

    return Election.find(activeCondition)
        .update( { $set: { isActive: false } })
        .exec()
        .then((results) => {
            return results;
        })
        .catch(() => {
            return [];
        });
}

module.exports = {
    getActiveElections
}