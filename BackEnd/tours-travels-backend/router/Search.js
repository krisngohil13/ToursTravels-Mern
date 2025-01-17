const express = require("express");
const { getTourBySearch } = require("../controllers/searchController.js");

const searchRoute = express.Router();

// Route for getting featured tours
searchRoute.get("/", getTourBySearch);

module.exports = searchRoute;
