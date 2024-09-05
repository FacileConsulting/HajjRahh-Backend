const User = require('../models/user');

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
    const fetchSameUser = await User.findOne({ email });
    return res.status(200).send({ 
      message: 'User registered successfully', 
      status: 'success', 
      userCreated: true,
      username: fetchSameUser.username, 
      email: fetchSameUser.email, 
      phoneNumber: fetchSameUser.phoneNumber, 
      address: fetchSameUser.address, 
      isEnabledEmailNotification: fetchSameUser.isEnabledEmailNotification 
    });

  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error registering user', status: 'error' });
  }
};
