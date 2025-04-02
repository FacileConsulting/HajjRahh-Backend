const mongoose = require('mongoose');
const user = require('./user');

const restaurantPaymentSchema = new mongoose.Schema({
  userMobile: {
    type: String,
    required: true
  },
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
        