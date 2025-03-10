const mongoose = require('mongoose');

const hotelBookingMainSchema = new mongoose.Schema({ 
  bookingNumber: {
    type: String,
    required: true,
    unique: true
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
  hotelId: {
    type: String,
    required: true
  },
  placeName: {
    type: String,
    required: false
  },
  paymentDetails: {
    type: Object,
    required: false
  },  
  status: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('HotelBookingMain', hotelBookingMainSchema);