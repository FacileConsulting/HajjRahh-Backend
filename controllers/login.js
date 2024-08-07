const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Get the user data
exports.checkLoginUser = async (req, res) => {
  try {
    const { username, email, phonenumber, address, password } = req.body;
    const user = await User.findOne({ email });
    if (user && !(await user.comparePassword(password))) {
      return res.status(400).send({ message: 'Invalid password', error: false, invalidPassword: true });
    }
    if (!user) {
      return res.status(400).send({ message: 'User not registered', error: false, invalidUser: true });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'a1b2c3d4e5f6g7h8i9j0', { expiresIn: '1h' });
    res.status(200).send({ 
      error: false,
      token, 
      username: user.username, 
      email: user.email, 
      phonenumber: user.phonenumber, 
      address: user.address,
    });
  } catch (error) {
    res.status(500).send({ message: 'Error logging in', error: true });
  }
};
