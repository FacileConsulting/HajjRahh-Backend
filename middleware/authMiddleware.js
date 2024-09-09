const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  console.log('####authmiddleware', req.headers.authorization)
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET || 'a1b2c3d4e5f6g7h8i9j0', (err, user) => {
      console.log('####usereeee', user)
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = authMiddleware;
