const mongoose = require('mongoose');

const tripsSchema = new mongoose.Schema({
  packageName: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  dateRange: {
    type: Array,
    required: true
  }
});

module.exports = mongoose.model('Trips', tripsSchema);