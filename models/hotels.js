const mongoose = require('mongoose');

const hotelsSchema = new mongoose.Schema({
  namePlace: {
    type: String,
    required: true
  },
  pricePerDay: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  journeyDate: {
    type: String,
    required: true
  },
  returnDate: {
    type: String,
    required: true
  },
  adults: {
    type: Number,
    required: true
  },
  roomInNumber: {
    type: String,
    required: false
  },
  hotelType: {
    type: Array,
    required: false
  },
  popularType: {
    type: Array,
    required: false
  },
  customerRating: {
    type: Array,
    required: false
  },
  starRating: {
    type: Array,
    required: false
  },
  amenities: {
    type: Array,
    required: false
  },
  nightsTotal: {
    type: Number,
    required: true
  },
  serviceFee: {
    type: Number,
    required: true
  },
  taxes: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },  
  hotelDetails: {
    type: Object,
    required: true
  },
});

module.exports = mongoose.model('Hotels', hotelsSchema);