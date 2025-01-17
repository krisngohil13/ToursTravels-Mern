const Tour = require("../models/Tour.js");

 const getTourBySearch = async (req, res) => {
  const { city, distance, maxGroupSize } = req.query;

  const query = {};

  if (city) {
    query.city = { $regex: new RegExp(city, "i") };
  }

  if (distance) {
    query.distance = { $gte: parseInt(distance) };
  }

  if (maxGroupSize) {
    query.maxGroupSize = { $gte: parseInt(maxGroupSize) };
  }

  try {
    const tours = await Tour.find(query).lean();

    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Search results retrieved successfully",
      data: tours,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to search for tours" });
  }
};

module.exports = { getTourBySearch };