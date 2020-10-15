const cron = require('node-cron');
const FiveMinsExpression = '*/1 * * * *'

const task = () => {
        cron.schedule(FiveMinsExpression, () => {
        console.log('running a task 5 minutes');

    });
}

module.exports = {
    task
};