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
    required: true
  },
  dateRange: {
    type: Array,
    required: true
  },
  food: {
    type: String,
    required: false
  },
  sacred: {
    type: String,
    required: false
  },
  hotelStar: {
    type: Number,
    required: false
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
  tourFocus: {
    type: Array,
    required: false
  },
  language: {
    type: Array,
    required: false
  },
  meals: {
    type: Array,
    required: false
  },
  vehicles: {
    type: Array,
    required: false
  },
  specialAmenities: {
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