const { constant } = require('../constant');
const { getToken } = require('../utils');
const { 
  getUser,
  createUser,
  saveInDB
} = require('../mongo');

exports.registerUser = async (req, res) => {
  const { c200, c500, register } = constant();
  try {
    const { username, email, phoneNumber, address, password } = req.body;
    console.log("sdfdsfsdfdsfsdfdsfd", username, email, phoneNumber, address, password);    

    // Check if user already exists
    const existingUser = await getUser({ email });
    if (existingUser) {
      return res.status(c200).send({ ...register.noDups });
    }

    // Create new user 
    const newUser = await createUser({ username, email, phoneNumber, address, password, isEnabledEmailNotification: "emailEnabled" });  
    await saveInDB(newUser);

    // Send response with user data
    const token = getToken({ email });
    const obj = { 
      ...register.valid,
      userId: newUser._id,
      username, 
      email, 
      phoneNumber, 
      address, 
      isEnabledEmailNotification: 'emailEnabled',
      paymentMethodType: [], 
      trips: []
    };
    if (token) {
      obj.token = token;
      return res.status(c200).send(obj);
    } else {
      return res.status(c200).send(obj);
    }

  } catch (error) {
    console.error(error);
    return res.status(c500).send({ ...register.error });
  }
};
