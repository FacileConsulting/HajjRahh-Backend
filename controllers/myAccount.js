const User = require('../models/user');

exports.myAccount = async (req, res) => {
  try {
    const { username, email, phoneNumber, address, password, newPassword, isEnabledEmailNotification, paymentMethodType, type } = req.body;
    const user = await User.findOne({ email });

    if (user && type === 'EDIT_PROFILE') {
      if (username) {
        user.username = username;
      }
      // if (email) {
      //   user.email = email;
      // }
      if (phoneNumber) {
        user.phoneNumber = phoneNumber;
      }
      if (address) {
        user.address = address;
      }
      await user.save();
      res.status(200).send({ 
        status: 'success',
        userId: user._id,
        token: user.token, 
        username: user.username, 
        email: user.email, 
        phoneNumber: user.phoneNumber, 
        address: user.address,
      });
    } else if (user && type === 'CHANGE_PASSWORD') {
      if (password && !(await user.comparePassword(password))) {
        return res.status(200).send({ message: 'Invalid old password', status: 'success', invalidPassword: true });
      }
      if (newPassword) {
        user.password = newPassword;
        await user.save();
        res.status(200).send({ message: 'Password changed successfully', status: 'success', passwordChanged: true });
      }
    } else if (user && type === 'NOTIFICATION_SETTINGS') {
      if (isEnabledEmailNotification) {
        user.isEnabledEmailNotification = isEnabledEmailNotification;
      }
      await user.save();
      res.status(200).send({ 
        status: 'success',
        isEnabledEmailNotification: user.isEnabledEmailNotification
      });
    } else if (user && type === 'PAYMENT_METHOD') {
      if (paymentMethodType) {
        user.paymentMethodType = paymentMethodType;
      }
      await user.save();
      res.status(200).send({ 
        status: 'success',
        paymentMethodType: user.paymentMethodType
      });
    } else {
      return res.status(500).send({ message: 'Issue in user data fetch', status: 'error' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Catch Error in myAccount Edit and Updates', status: 'error' });
  }
};
