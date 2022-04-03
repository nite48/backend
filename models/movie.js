const mongoose = require('mongoose');

const resultDistanceSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = mongoose.model('resultDistanceSchema', resultDistanceSchema);
