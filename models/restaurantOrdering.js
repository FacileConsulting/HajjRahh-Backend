const mongoose = require('mongoose');

const restaurantOrderingSchema = new mongoose.Schema({
  userMobile: {
    type: String,
    required: true
  },
  restaurantOrderingCustomerName: {
    type: String,
    required: true
  },
  restaurantOrderingMobile: {
    type: String,
    required: true
  },
  restaurantOrderingOrderDetails: {
    type: Array,
    required: true
  },
  restaurantOrderingPickUpDelivery: {
    type: String,
    required: true
  },
  restaurantOrderingOrderStatus: {
    type: String,
    required: true
  },
  restaurantOrderingAct: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('RestaurantOrdering', restaurantOrderingSchema);