const express = require("express");
const { createTour, deleteTour, getAllTour, getFeaturedTour, getSingleTour, getTourCount, updateTour } = require("../controllers/tourController.js");
const { verifyAdmin } = require("../utils/verifyToken.js");

const tourRoute = express.Router();

// Route for getting featured tours
tourRoute.get("/featured", getFeaturedTour);

tourRoute.get("/:id", getSingleTour);

tourRoute.post("/",verifyAdmin, createTour);

tourRoute.put("/:id", verifyAdmin,updateTour);

tourRoute.delete("/:id", verifyAdmin,deleteTour);

tourRoute.get("/",getAllTour);

tourRoute.get("/count", getTourCount);

module.exports = tourRoute;
