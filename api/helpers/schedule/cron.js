const cron = require('node-cron');
const { InactivateElections } = require('./models');


const FiveMinsExpression = '*/1 * * * *';

const task = () => {
    cron.schedule(FiveMinsExpression, async () => {
        const inactivatedElections = await InactivateElections();
        if (!inactivatedElections.length) return;

        inactivatedElections.forEach(el => {
            
        })

    });
}

module.exports = {
    task
};