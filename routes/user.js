const express = require('express');
const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const profileContoller = require('../controllers/profile');

const router = express.Router();
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/auth', authController.protect, authController.auth);
router.delete('/', authController.protect, userController.deleteMe);
router.delete('/:userId', userController.deleteUserById);
module.exports = router;
