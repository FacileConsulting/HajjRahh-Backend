const User = require('../models/user');

exports.registerUser = async (req, res) => {
  try {
    const { username, email, phoneNumber, address, password } = req.body;

    // Check if required fields are present
    if (!username || !email || !password) {
      return res.status(400).send({ message: 'Missing required fields', status: 'success', emptyField: true, username, email, phoneNumber, address });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'User already registered', status: 'success', isDups: true, username, email, phoneNumber, address });
    }

    // Create new user
    const newUser = new User({ username, email, phoneNumber, address, password });
    await newUser.save();

    // Send response with user data
    return res.status(200).send({ message: 'User registered successfully', status: 'success', userCreated: true, username, email, phoneNumber, address });

  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error registering user', status: 'error', username, email, phoneNumber, address });
  }
};
