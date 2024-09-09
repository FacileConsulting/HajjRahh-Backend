const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { username, email, phoneNumber, address, password } = req.body;
    console.log("sdfdsfsdfdsfsdfdsfd", username, email, phoneNumber, address, password);    

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).send({ message: 'User already registered. Please Sign In', status: 'success', isDups: true });
    }

    // Create new user    
    const newUser = new User({ username, email, phoneNumber, address, password, isEnabledEmailNotification: "emailEnabled" });
    await newUser.save();

    // Send response with user data
    const token = jwt.sign({ email: email }, process.env.JWT_SECRET || 'a1b2c3d4e5f6g7h8i9j0', { expiresIn: '1h' });
    return res.status(200).send({ 
      message: 'User registered successfully', 
      status: 'success', 
      userCreated: true,
      token, 
      username, 
      email, 
      phoneNumber, 
      address, 
      isEnabledEmailNotification: 'emailEnabled',
      paymentMethodType: [], 
      trips: []
    });

  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error registering user', status: 'error' });
  }
};
