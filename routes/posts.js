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

router
  .route('/like/:postId')
  .put(authController.protect, postsController.likePost);

router
  .route('/unlike/:postId')
  .put(authController.protect, postsController.unlikePost);

module.exports = router;
