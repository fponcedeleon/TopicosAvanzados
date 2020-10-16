const getResults = (election, proposals, options) => {
  const results = {};
  options.forEach(opt => {
    const pId = opt.proposalId;
    if (!results[pId]) {
      results[pId] = [];
    }

    results[pId].push(opt.votants.length);
  });

  for (const key in results) {
    const sum = results[key].reduce((a, b) => a + b, 0);
    results[key] = sum;
  }

  return results;
};

module.exports = {
  getResults,
};
