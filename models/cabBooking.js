const mongoose = require('mongoose');
const user = require('./user');

const cabBookingSchema = new mongoose.Schema({
  userMobile: {
    type: String,
    required: true  
  },
  cabBookVehicleName: {
    type: String,
    required: true
  },
  cabBookVehicleNumber: {
    type: String,
    required: true
  },
  cabBookPickupLocation: {
    type: String,
    required: false
  },
  cabBookPickupDate: {
    type: String,
    required: true
  },
  cabBookDropOffLocation: {
    type: String,
    required: true
  },
  cabBookDropOffDate: {
    type: String,
    required: true
  },
  cabBookRideStatus: {
    type: String,
    required: true
  },
  cabBookPaymentStatus: {
    type: String,
    required: true
  },
  cabBookStarRating: {
    type: String,
    required: true
  },
  cabBookReview: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('cabBooking', cabBookingSchema);
        