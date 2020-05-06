const User = require('../models/User');
const Profile = require('../models/Profile');
const catchAsync = require('../utils/catchAsync');

exports.deleteMe = catchAsync(async (req, res, next) => {
  await Profile.findOneAndRemove({ user: req.user._id });
  await User.findByIdAndDelete(req.user._id);
  res.status(204).json({ status: 'success' });
});

exports.deleteUserById = catchAsync(async (req, res, next) => {
  await Profile.findOneAndRemove({ user: req.params.userId });
  await User.findByIdAndDelete(req.params.userId);
  res.status(204).json({ status: 'success' });
});
