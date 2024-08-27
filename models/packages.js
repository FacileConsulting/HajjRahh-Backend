const mongoose = require('mongoose');

const packagesSchema = new mongoose.Schema({
  packageName: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  departure: {
    type: Array,
    required: false
  },
  dateRange: {
    type: Array,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  totalNights: {
    type: Number,
    required: true
  },
  packageDuration: {
    type: String,
    required: true
  },
  transportation: {
    type: Array,
    required: false
  },
  theme: {
    type: Array,
    required: false
  },
  facilities: {
    type: Array,
    required: false
  },
  image: {
    type: String,
    required: false
  },
  packageDetails: {
    type: Object,
    required: false
  },
});

module.exports = mongoose.model('Packages', packagesSchema);