const { constant } = require('../constant');
const { 
  getUser,
  saveInDB,
} = require('../mongo');

exports.myAccount = async (req, res) => {
  const { c200, c500, yS, login, myAccount } = constant();
  try {
    const { username, email, phoneNumber, address, password, newPassword, isEnabledEmailNotification, paymentMethodType, type } = req.body;
    const user = await getUser({ email });

    if (user && type === myAccount.editProfile) {
      if (username) {
        user.username = username;
      }
      if (phoneNumber) {
        user.phoneNumber = phoneNumber;
      }
      if (address) {
        user.address = address;
      }
      await saveInDB(user);
      res.status(c200).send({ 
        status: yS,
        userId: user._id,
        token: user.token, 
        username: user.username, 
        email: user.email, 
        phoneNumber: user.phoneNumber, 
        address: user.address,
      });
    } else if (user && type === myAccount.changePassword) {
      if (password && !(await user.comparePassword(password))) {
        res.status(c200).send({ ...login.invalid });
      }
      if (newPassword) {
        user.password = newPassword;
        await saveInDB(user);
        res.status(c200).send({ ...myAccount.passwordChanged });
      }
    } else if (user && type === myAccount.notificationSetings) { 
      if (isEnabledEmailNotification) {
        user.isEnabledEmailNotification = isEnabledEmailNotification;
      }
      await saveInDB(user);
      res.status(c200).send({ 
        status: yS,
        isEnabledEmailNotification: user.isEnabledEmailNotification
      });
    } else if (user && type === myAccount.paymentMethod) { 
      if (paymentMethodType) {
        user.paymentMethodType = paymentMethodType;
      }
      await saveInDB(user);
      res.status(c200).send({ 
        status: yS,
        paymentMethodType: user.paymentMethodType
      });
    } else {
      return res.status(c500).send({ ...myAccount.errorUser });
    }
  } catch (error) {
    console.error(error);
    return res.status(c500).send({ ...myAccount.error });
  }
};
