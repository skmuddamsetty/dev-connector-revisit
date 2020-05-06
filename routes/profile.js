const express = require('express');
const profileController = require('../controllers/profile');
const authController = require('../controllers/auth');

const router = express.Router();

router.get(
  '/me',
  authController.protect,
  profileController.getCurrentUserProfile
);

router
  .route('/')
  .get(profileController.getAllProfiles)
  .post(authController.protect, profileController.createProfile)
  .delete(authController.protect, profileController.deleteMyProfile);

router
  .route('/:userId')
  .get(profileController.getProfileById)
  .delete(profileController.deleteUserProfile);

module.exports = router;
