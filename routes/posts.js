const express = require('express');
const postsController = require('../controllers/posts');
const authController = require('../controllers/auth');
const router = express.Router();

router
  .route('/')
  .post(authController.protect, postsController.createPost)
  .get(authController.protect, postsController.getAllPosts);

router
  .route('/:postId')
  .get(authController.protect, postsController.getPostById)
  .delete(authController.protect, postsController.deletePostById);

module.exports = router;
