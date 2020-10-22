const cron = require('node-cron');
const { InactivateElections, updateElections } = require('./models');
const { getProposalsByElection } = require("../../routes/proposal/handlers");
const { getOptionsByProposal } = require("../../routes/option/handlers");
const { create } = require("../../routes/sendMail/handlers");

const FiveMinsExpression = '*/1 * * * *';

const linkUrl = process.env.NODE_ENV === 'localhost' ? 
                    'http://localhost:3000' : 
                        process.env.ENVIRONMENT === 'test' ? 
                            'https://topicos2020testing.netlify.app' :
                            'https://topicos2020.netlify.app';

const task = () => {
    cron.schedule(FiveMinsExpression, async () => {
        const inactivatedElections = await InactivateElections();
        if (!inactivatedElections.length) return;

        inactivatedElections.forEach(async el => {
            const obj = {
                query: {
                    id: el._id
                }
            }

            const proposals = await getProposalsByElection(obj);
            obj.query.id = proposals[0]._id;
            const options = await getOptionsByProposal(obj);
            let allVotants = [];
            options.forEach(opt => {
                
                allVotants = allVotants.concat(opt.votants);
            });
            
            const cleanVotants = [...new Set(allVotants)];
            cleanVotants.forEach(async votant => {
                const link = `${linkUrl}/votingResult/${el._id}`;
                const params = {
                    userName: votant.firstName,
                    userEmail: votant.email,
                    electionName: el.name,
                    electionLink: link,
                    subject: 'Resultado de eleccion',
                    isNewElection: false,
                    endDate: null,
                };
                
                const payload = {
                    payload: params,
                }
                await create(payload);
            })

        })

        updateElections();

    });
}

module.exports = {
    task
};