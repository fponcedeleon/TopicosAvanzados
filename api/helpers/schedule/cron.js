const cron = require('node-cron');
const { getActiveElections } = require('./models');


const FiveMinsExpression = '*/1 * * * *';

const task = () => {
    cron.schedule(FiveMinsExpression, async () => {
        const activeElections = await getActiveElections();
        if (!activeElections.length) return;

        activeElections.forEach(el => {
            console.log(el);
            // We will send emails here
        })

    });
}

module.exports = {
    task
};