const mongoose = require('mongoose');

const restaurantPromotionSchema = new mongoose.Schema({
  userMobile: {
    type: String,
    required: true
  },
  restaurantPromoCode: {
    type: String,
    required: true
  },
  restaurantPromoType: {
    type: String,
    required: true
  },
  restaurantAssignTo: {
    type: String,
    required: true
  },
  restaurantPromoEngine: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('RestaurantPromotion', restaurantPromotionSchema);