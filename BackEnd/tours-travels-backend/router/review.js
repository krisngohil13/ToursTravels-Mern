const express = require("express");
const { createReview, getTourReviews, deleteReview } = require("../controllers/reviewController.js");
const {verifyUser} = require("../utils/verifyToken.js")

const reviewRoute = express.Router();

// Create a new review for a tour
reviewRoute.post('/:TourId' ,createReview);

// Get all reviews for a tour
reviewRoute.get('/:TourId', getTourReviews);

// Delete a review
reviewRoute.delete('/:reviewId',verifyUser, deleteReview);

module.exports = reviewRoute;
