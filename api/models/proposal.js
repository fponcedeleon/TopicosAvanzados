const mongoose = require('mongoose');

const { Schema } = mongoose;

const proposalsSchema = new Schema({
  electionId: { type: Schema.ObjectId, ref: 'Election', required: true },
  name: { type: String, required: true },
  description: { type: String },
});

const proposals = mongoose.model('Proposal', proposalsSchema);
module.exports = proposals;
