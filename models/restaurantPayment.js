const mongoose = require('mongoose');

const restaurantPaymentSchema = new mongoose.Schema({
  restaurantPaymentDateTime: {
    type: String,
    required: true
  },
  restaurantPaymentCustomerName: {
    type: String,
    required: true
  },
  restaurantPaymentOrderDetails: {
    type: Array,
    required: true
  },
  restaurantPaymentOrderAmount: {
    type: String,
    required: true
  },
  restaurantPaymentType: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('RestaurantPayment', restaurantPaymentSchema);
        