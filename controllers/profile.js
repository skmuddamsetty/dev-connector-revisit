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

/**
 * @route  POST /api/v1/profile
 * @desc   Create or update the user profile
 * @access Protected
 */
exports.createProfile = catchAsync(async (req, res, next) => {
  const {
    company = undefined,
    website = undefined,
    location = undefined,
    bio = undefined,
    status = undefined,
    githubusername = undefined,
    skills,
    youtube = undefined,
    facebook = undefined,
    twitter = undefined,
    instagram = undefined,
    linkedin = undefined,
  } = req.body;

  // Build profile object
  const profileFields = {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
  };
  profileFields.user = req.user._id;
  // Build Skills Object
  if (skills) {
    profileFields.skills = skills.split(' ').map((skill) => skill.trim());
  }
  // Build Social Object
  profileFields.social = { youtube, twitter, facebook, linkedin, instagram };
  let profile = await Profile.findOne({ user: req.user._id });
  if (profile) {
    // update
    profile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $set: profileFields },
      { new: true, runValidators: true }
    );
  } else {
    // Create
    profile = await Profile.create(profileFields);
  }
  res.status(200).json({ status: 'success', profile });
});
