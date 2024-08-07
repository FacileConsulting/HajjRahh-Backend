const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: String,
    required: true
  },
  accommodation: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Package', packageSchema);