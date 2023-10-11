const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  name: {
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
  tel: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  sector: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Contact", contactSchema);
