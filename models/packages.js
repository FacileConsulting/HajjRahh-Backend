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
    required: true
  },
  theme: {
    type: Array,
    required: true
  },
  facilities: {
    type: Array,
    required: true
  },
  avatarPhotoUrl: {
    type: String,
    required: true
  },
  packageDetails: {
    type: Object,
    required: true
  },
});

module.exports = mongoose.model('Packages', packagesSchema);