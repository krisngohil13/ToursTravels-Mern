const express = require('express');
const { verifyUser } = require('../utils/verifyToken.js');
const { createComment, getCommentsByBlogId, deleteComment } = require('../controllers/commentController.js');

const commentRoute = express.Router();

commentRoute.route('/:BlogId')
    .post(createComment)
    .get(getCommentsByBlogId);

commentRoute.route('/:commentId')
    .get(verifyUser, deleteComment);

module.exports = commentRoute;
