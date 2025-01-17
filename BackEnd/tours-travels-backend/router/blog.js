const express = require('express');

const {
    createBlog,
    updateBlog,
    getSingleBlog,
    getAllBlogs,
    getFeaturedBlogs
} = require('../controllers/blogController.js');

const blogRoute = express.Router();

blogRoute
    .get('/featured', getFeaturedBlogs)
    .get('/:id', getSingleBlog)
    .get('/', getAllBlogs)
    .post('/', createBlog)
    .put('/:id', updateBlog);

module.exports = blogRoute;
