const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Profile = require('../models/Profile');

/**
 * @route  GET /api/v1/profile/me
 * @desc   Get Current Logged in User Profile
 * @access Protected
 */
exports.getCurrentUserProfile = catchAsync(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user._id }).populate({
    path: 'user',
    select: ['-__v', '-passwordChangedAt'],
  });
  if (!profile) {
    return next(new AppError('Profile not found for this user!', 400));
  }
  res.status(200).json({ status: 'success', profile });
});
