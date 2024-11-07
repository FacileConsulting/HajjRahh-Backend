const mongoose = require('mongoose');

const holidayBookingSchema = new mongoose.Schema({ 
  billingDetails: {
    type: Object,
    required: false
  },
  bookingNumber: {
    type: String,
    required: true,
    unique: true
  },
  departurePlaceLabel: {
    type: String,
    required: true
  },
  destinationPlaceLabel: {
    type: String,
    required: true
  },
  holidayDetailsEndDate: {
    type: String,
    required: true
  },
  holidayDetailsStartDate: {
    type: String,
    required: true
  },
  holidayId: {
    type: String,
    required: true,
    unique: true
  },
  packageDuration: {
    type: String,
    required: false
  },
  packageName: {
    type: String,
    required: true
  },
  paymentDetails: {
    type: Object,
    required: false
  },
  userId: {
    type: String,
    required: true,
    unique: true
  },
  passengers: {
    type: Array,
    required: false
  },
});

module.exports = mongoose.model('HolidayBooking', holidayBookingSchema);