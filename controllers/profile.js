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

/**
 * @route  GET /api/v1/profile
 * @desc   Get All Profiles
 * @access Public
 */
exports.getAllProfiles = catchAsync(async (req, res) => {
  const profiles = await Profile.find().populate({
    path: 'user',
    select: ['-__v', '-passwordChangedAt'],
  });
  return res
    .status(200)
    .json({ status: 'success', results: profiles.length, data: { profiles } });
});

/**
 * @route  GET /api/v1/profile/:userId
 * @desc   Get All Profiles
 * @access Public
 */
exports.getProfileById = catchAsync(async (req, res, next) => {
  console.log(req.params.userId);
  const profile = await Profile.findOne({ user: req.params.userId }).populate({
    path: 'user',
    select: ['-__v', '-passwordChangedAt'],
  });
  if (!profile) {
    return next(new AppError('No Profile found for this user', 400));
  }
  return res.status(200).json({ status: 'success', profile });
});

/**
 * @route  DELETE /api/v1/profile/
 * @desc   Delete Profile, Posts and User for the logged in user
 * @access Protected
 */
exports.deleteMyProfile = catchAsync(async (req, res) => {
  await Profile.findOneAndRemove({ user: req.user._id });
  return res.status(204).json({ status: 'success' });
});

/**
 * @route  DELETE /api/v1/profile/:userId
 * @desc   Delete Profile for the userId passed in params
 * @access Public
 */
exports.deleteUserProfile = catchAsync(async (req, res) => {
  await Profile.findOneAndRemove({ user: req.params.userId });
  return res.status(204).json({ status: 'success' });
});

/**
 * @route  PUT /api/v1/profile/experience
 * @desc   Add profile experience
 * @access Protected
 */
exports.addProfileExperience = catchAsync(async (req, res, next) => {
  const { company, title, from, to, location, current, description } = req.body;
  if (!company || !title || !from) {
    return next(new AppError('Please provide company, title, from', 400));
  }
  const newExp = {
    title,
    company,
    from,
    to,
    location,
    current,
    description,
  };

  const profile = await Profile.findOne({ user: req.user._id });

  if (!profile) {
    return next(new AppError('No Profile found for this user', 400));
  }
  profile.experience.unshift(newExp);
  await profile.save();
  res.status(200).json({ status: 'success', profile });
});

/**
 * @route  DELETE /api/v1/profile/experience/:expId
 * @desc   Delete profile experience
 * @access Protected
 */
exports.deleteExperience = catchAsync(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user._id });
  // Get remove index
  const removeIndex = profile.experience
    .map((exp) => exp._id)
    .indexOf(req.params.expId);
  profile.experience.splice(removeIndex, 1);
  await profile.save();
  res.status(200).json({ status: 'success', profile });
});

/**
 * @route  PUT /api/v1/profile/education
 * @desc   Add education
 * @access Protected
 */
exports.addEducation = catchAsync(async (req, res, next) => {
  const {
    school,
    degree,
    fieldofstudy,
    from,
    current,
    description,
    to,
  } = req.body;
  if (!school || !degree || !fieldofstudy || !from) {
    return next(new AppError('Please provide school, fieldofstudy, from', 400));
  }
  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  };

  const profile = await Profile.findOne({ user: req.user._id });

  if (!profile) {
    return next(new AppError('No Profile found for this user', 400));
  }
  profile.education.unshift(newEdu);
  await profile.save();
  res.status(200).json({ status: 'success', profile });
});

/**
 * @route  DELETE /api/v1/profile/education/:eduId
 * @desc   Delete Education
 * @access Protected
 */
exports.deleteEducation = catchAsync(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user._id });
  // Get remove index
  const removeIndex = profile.education
    .map((edu) => edu._id)
    .indexOf(req.params.eduId);
  profile.education.splice(removeIndex, 1);
  await profile.save();
  res.status(200).json({ status: 'success', profile });
});
