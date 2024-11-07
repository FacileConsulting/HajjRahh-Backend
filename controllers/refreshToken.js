const { getToken } = require('../utils');
const { constant } = require('../constant');

exports.getRefreshToken = async (req, res) => {
  const { c200, c500, yS, refreshToken } = constant();
  try {
    const { email } = req.body;
    const token = getToken({ email });
    // Send response with user data
    res.status(c200).send({ token, status: yS });
  } catch (error) {
    console.error(error);
    return res.status(c500).send({ ...refreshToken.error });
  }
};
