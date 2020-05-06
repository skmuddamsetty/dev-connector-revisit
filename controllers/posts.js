const User = require('../models/User');
const Profile = require('../models/Profile');
const Post = require('../models/Post');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
/**
 * @route  POST /api/v1/posts
 * @desc   Create a post for logged in user
 * @access Protected
 */

exports.createPost = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select('-password');
  const newPost = new Post({
    text: req.body.text,
    name: user.name,
    avatar: user.avatar,
    user: req.user._id,
  });

  const post = await newPost.save();
  res.status(200).json({ status: 'success', post });
});

/**
 * @route  GET /api/v1/posts
 * @desc   Get All Posts
 * @access Protected
 */
exports.getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.status(200).json({ status: 'success', posts });
});

/**
 * @route  GET /api/v1/posts/:postId
 * @desc   Get Post By Id
 * @access Protected
 */
exports.getPostById = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);
  if (!post) {
    return next(new AppError('Post with that id not found!', 400));
  }
  res.status(200).json({ status: 'success', post });
});

/**
 * @route  GET /api/v1/posts/:postId
 * @desc   Get Post By Id
 * @access Protected
 */
exports.deletePostById = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);
  if (!post) {
    return next(new AppError('Post with that id not found!', 400));
  }
  // Check user
  if (post.user.toString() !== req.user._id.toString()) {
    return next(new AppError('User Not Authorized!', 401));
  }
  await post.remove();
  res.status(204).json({ status: 'success', post });
});
