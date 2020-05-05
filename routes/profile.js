const express = require('express');
const profileController = require('../controllers/profile');
const authController = require('../controllers/auth');

const router = express.Router();
router.get(
  '/me',
  authController.protect,
  profileController.getCurrentUserProfile
);

module.exports = router;
