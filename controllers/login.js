const { constant } = require('../constant');
const { getToken } = require('../utils');
const { 
  getUser
} = require('../mongo');

// Get the user data
exports.checkLoginUser = async (req, res) => {
  const { c200, c500, login } = constant();
  try {
    const { email, password } = req.body;
    const user = await getUser({ email });
    // console.log('QQQQQQQQQQQ##   tokenuser', user);
    if (user && !(await user.comparePassword(password))) {
      return res.status(c200).send({ ...login.invalid });
    }
    if (!user) {
      return res.status(c200).send({ ...login.invalidUser });
    }
    const token = getToken({ email: user.email });
    res.status(c200).send({ 
      ...login.valid,
      userId: user._id,
      token,
      username: user.username, 
      email: user.email, 
      phoneNumber: user.phoneNumber, 
      address: user.address,
      isEnabledEmailNotification: user.isEnabledEmailNotification,
      paymentMethodType: user.paymentMethodType, 
      trips: user.trips
    });
  } catch (error) {
    res.status(c500).send({ ...login.error });
  }
};
