const mongoose = require('mongoose');

const HotelBookingSchema = new mongoose.Schema({ 
  userMobile: {
    type: String,
    required: true
  },
  hotelName: {
    type: String,
    required: true
  },
  hotelLocation: {
    type: String,
    required: true
  },
  hotelContact: {
    type: String,
    required: true
  },
  hotelEmail: {
    type: String,
    required: true
  },
  hotelStarRating: {
    type: Number,
    required: false
  },
  hotelHalalCertificate: {
    type: Object,
    required: true
  },
  hotelPaymentOptions: {
    type: String,
    required: true
  },
  hotelBlackOutDates: {
    type: String,
    required: true
  },
  hotelRoomsList: {
    type: Array,
    required: true
  },
  hotelInclusions: {
    type: String,
    required: true
  },
  ishotelHalalCertificate: {
    type: String,
    required: true
  },
  hotelExclusions: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('HotelBooking', HotelBookingSchema);