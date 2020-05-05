const jwt = require('jsonwebtoken');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { promisify } = require('util');

/**
 * @route  POST /api/v1/users/signup
 * @desc   Register or Signup User
 * @access Public
 */
exports.signup = catchAsync(async (req, res) => {
  const newUser = await User.create(req.body);
  createAndSendToken(newUser, 201, res);
});

/**
 * @route  GET /api/v1/users/auth
 * @desc   Finds and returns the user with the id based on the id coming from protect *         middleware
 * @access Public
 */
exports.auth = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({ status: 'success', user });
});

/**
 * checks if the user is logged in and is a valis user
 */
exports.protect = catchAsync(async (req, res, next) => {
  // 1) get the token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }
  // 2) validate token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) check if the user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError('The user belonging to this token does not exist', 401)
    );
  }
  // 4) check if user changed the password after issuing the JWT
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        'User recently has changed the password. Please log in again',
        401
      )
    );
  }
  // 5) GRANT ACCESS TO THE PROTECTED ROUTE
  req.user = freshUser;
  next();
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
