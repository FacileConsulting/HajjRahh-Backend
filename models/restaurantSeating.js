const mongoose = require('mongoose');

const restaurantSeatingSchema = new mongoose.Schema({
  userMobile: {
    type: String,
    required: true
  },
  restaurantSeatingCustomer: {
    type: String,
    required: true
  },
  restaurantSeatingMobile: {
    type: String,
    required: true
  },
  restaurantSeatingDateTime: {
    type: String,
    required: true
  },
  restaurantSeatingGuests: {
    type: String,
    required: true
  },
  restaurantSeatingTable: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('RestaurantSeating', restaurantSeatingSchema);