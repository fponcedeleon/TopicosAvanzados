const mongoose = require("mongoose");

const { Schema } = mongoose;

const tokenSchema = new Schema({
  electionId: { type: Schema.ObjectId, ref: "Election", required: true },
  userId: { type: Schema.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
});

const tokens = mongoose.model("Token", tokenSchema);
module.exports = tokens;
