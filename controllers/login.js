const { constant } = require('../constant');
const { getToken } = require('../utils');
const { 
  getUser,
  saveInDB
} = require('../mongo');

// Get the user data
exports.checkLoginUser = async (req, res) => {
  const { c200, c500, login } = constant();
  try {
    const { email, password, rePassword, isGoogle = false } = req.body;
    const user = await getUser({ email });
    if (user && !isGoogle && !rePassword && !(await user.comparePassword(password))) {
      return res.status(c200).send({ ...login.invalid });
    }
    if (user && !isGoogle && rePassword) {
      user.password = rePassword;
      await saveInDB(user);
    }
    if (!user) {
      return res.status(c200).send({ ...login.invalidUser });
    }
    const token = getToken({ email: user.email });
    res.status(c200).send({ 
      ... (rePassword ? login.passwordChanged : login.valid),
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
