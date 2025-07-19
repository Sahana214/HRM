const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  days: [String],
});

module.exports = mongoose.model("Availability", availabilitySchema);