const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Get the user data
exports.checkLoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log('QQQQQQQQQQQ##   token', email, password);
    const user = await User.findOne({ email });
    if (user && !(await user.comparePassword(password))) {
      return res.status(200).send({ message: 'Invalid password', status: 'success', invalidPassword: true });
    }
    if (!user) {
      return res.status(200).send({ message: 'User not registered', status: 'success', invalidUser: true });
    }
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET || 'a1b2c3d4e5f6g7h8i9j0', { expiresIn: '1h' });
    res.status(200).send({ 
      message: 'User logged in successfully', 
      status: 'success',
      userId: user._id,
      token, 
      userLoggedIn: true,
      username: user.username, 
      email: user.email, 
      phoneNumber: user.phoneNumber, 
      address: user.address,
      isEnabledEmailNotification: user.isEnabledEmailNotification,
      paymentMethodType: user.paymentMethodType, 
      trips: user.trips
    });
  } catch (error) {
    res.status(500).send({ message: 'Error logging in', status: 'error' });
  }
};
