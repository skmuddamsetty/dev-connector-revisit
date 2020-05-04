const jwt = require('jsonwebtoken');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');

/**
 * @route  POST /api/v1/users/signup
 * @desc   Register or Signup User
 * @access Public
 */
exports.signup = catchAsync(async (req, res) => {
  const newUser = await User.create(req.body);
  createAndSendToken(newUser, 201, res);
});

/*****************Helper Methods Start************************/
const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  if (process.env.NODE_ENV === 'production') {
    // the cookie will be sent only in an encrypted connection by using secure: true
    cookieOptions.secure = true;
  }
  res.cookie('jwt', token, cookieOptions);
  /**
   * by setting the fields to undefined, these fields will not be displayed to the user
   */
  user.password = undefined;
  user.passwordChangedAt = undefined;
  user.createdAt = undefined;
  user.role = undefined;
  user.active = undefined;
  user.__v = undefined;
  res.status(statusCode).json({ status: 'success', token, data: { user } });
};

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const cookieOptions = {
  expiresIn:
    new Date(Date.now()) +
    process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
  // this will make the cookie that the browser cannot modify the cookie
  httpOnly: true,
};
/*****************Helper Methods End************************/
