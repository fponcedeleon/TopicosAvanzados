const mongoose = require("mongoose");

const { Schema } = mongoose;

const electionSchema = new Schema({
  createdBy: { type: Schema.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isActive: { type: Boolean, required: true, default: true },
  minAge: { type: Number },
  maxAge: { type: Number },
  city: { type: String },
  country: { type: String },
});

const election = mongoose.model("Election", electionSchema);
module.exports = election;
