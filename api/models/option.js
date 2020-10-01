const mongoose = require('mongoose');

const { Schema } = mongoose;

const optionsSchema = new Schema({
  proposalId: { type: Schema.ObjectId, ref: 'Proposal', required: true },
  name: { type: String, required: true },
  votants: { type: [{ type: Schema.ObjectId, ref: 'User', required: true }] }
});

const options = mongoose.model('Option', optionsSchema);
module.exports = options;
