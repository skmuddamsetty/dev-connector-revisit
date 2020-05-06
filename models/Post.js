const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  // parent referencing user and profile documents
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Post must belong to a user.'],
  },
  text: {
    type: String,
    required: [true, 'Please enter valid text!'],
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A like must belong to a user.'],
      },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A comment must belong to a user.'],
      },
      text: {
        type: String,
        required: [true, 'Please provide valid text for a comment!'],
      },
      avatar: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      name: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
