const mongoose = require('mongoose');

const timeSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model('time', timeSchema);
