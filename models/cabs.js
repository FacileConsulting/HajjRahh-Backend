const mongoose = require('mongoose');

const cabsSchema = new mongoose.Schema({
  cabTripType: {
    type: String,
    required: true
  },
  cabPickUpPlace: {
    type: String,
    required: true
  },
  cabDropPlace: {
    type: String,
    required: true
  },
  cabDate: {
    type: String,
    required: true
  },
  cabTime: {
    type: String,
    required: false
  },
  cabPassengersCount: {
    type: Number,
    required: false
  },
  cabPrice: {
    type: Number,
    required: true
  },
  cabVehicleType: {
    type: String,
    required: false
  },
  cabCarModel: {
    type: String,
    required: true
  },
  pickUpDropDistance: {
    type: Number,
    required: true
  },
  cabName: {
    type: String,
    required: true
  },
  cabFeatures: {
    type: Array,
    required: false
  },
  cabTermsAndCondition: {
    type: Array,
    required: false
  },
  cabDiscount: {
    type: Number,
    required: false
  },
  cabImage: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Cabs', cabsSchema);