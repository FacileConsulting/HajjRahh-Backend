const mongoose = require('mongoose');

const PilgrimageBookingSchema = new mongoose.Schema({ 
  userMobile: {
    type: String,
    required: true
  },
  pilBookVendorName: {
    type: String,
    required: true
  },
  pilBookMobile: {
    type: String,
    required: true
  },
  pilBookEmail: {
    type: String,
    required: true
  },
  pilBookDocumentStatus: {
    type: String,
    required: true
  },
  pilBookStatus: {
    type: String,
    required: true
  },
  pilBookVendorCount: {
    type: Number,
    required: true
  },
  pilBookPackageName: {
    type: String,
    required: true
  },
  pilBookFromDate: {
    type: String,
    required: true
  },
  pilBookToDate: {
    type: String,
    required: false
  },
  pilBookTravelersList: {
    type: Array,
    required: true
  }
});

module.exports = mongoose.model('PilgrimageBooking', PilgrimageBookingSchema);