

exports.checkHealth = async (req, res) => {
  try {
    // Send response with user data
    res.status(200).send({ message: 'Health API called successfully', status: 'success' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error in health API', status: 'error' });
  }
};
