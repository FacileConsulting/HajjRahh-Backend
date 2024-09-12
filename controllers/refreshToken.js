const jwt = require('jsonwebtoken');

exports.getRefreshToken = async (req, res) => {
  try {
    const { email } = req.body;
    const token = jwt.sign({ email }, process.env.JWT_SECRET || 'a1b2c3d4e5f6g7h8i9j0', { expiresIn: '1h' });
    // Send response with user data
    res.status(200).send({ token, status: 'success' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error in refreshToken API', status: 'error' });
  }
};
