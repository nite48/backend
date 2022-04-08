const mongoose = require('mongoose');

const Write = new mongoose.Schema({
  dateBirth: {
    type: Date,
    required: true,
  },
  doctor: {
    type: String,
    required: true,
  },
  dateWtire: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  family: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

module.exports = mongoose.model('writePacient', Write);
