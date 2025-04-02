const mongoose = require('mongoose');

const cabsVendorSchema = new mongoose.Schema({
  userMobile: {
    type: String,
    required: true
  },
  cabPromoCode: {
    type: String,
    required: true
  },
  cabPromoType: {
    type: String,
    required: true
  },
  cabAssignTo: {
    type: String,
    required: true
  },
  cabPromoEngine: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('CabsVendor', cabsVendorSchema);