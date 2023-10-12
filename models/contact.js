const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  lastname: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  sector: {
    type: String,
    required: true,
    enum: ["industrie", "informatique", "sante", "education"],
  },
  active: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Contact", contactSchema);
