const Tour = require("../models/Tour.js");

// Create new tour
const createTour = async (req, res) => {
  try {
    const newTour = new Tour({
      ...req.body,
      reviews: [] // Initialize empty reviews array
    });

    const savedTour = await newTour.save();

    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedTour
    });
  } catch (err) {
    console.error("Error creating tour:", err); // Add this for debugging
    res.status(500).json({
      success: false,
      message: err.message || "Failed to create. Please try again"
    });
  }
};

// Update tour
const updateTour = async (req, res) => {
  const id = req.params.id;
  
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id, 
      { $set: req.body }, 
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedTour
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Failed to update"
    });
  }
};

// Delete tour
const deleteTour = async (req, res) => {
  const id = req.params.id;
  
  try {
    const deletedTour = await Tour.findByIdAndDelete(id);
    
    if (!deletedTour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Tour deleted successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete tour"
    });
  }
};

// Get single tour
const getSingleTour = async (req, res) => {
  const { id } = req.params;

  try {
    const tour = await Tour.findById(id);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tour retrieved successfully",
      data: tour,
    });
  } catch (err) {
    console.error("Error fetching single tour:", err);
    res.status(500).json({ success: false, message: "Failed to get the tour" });
  }
};

// Get all tours
const getAllTour = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Tours retrieved successfully",
      data: tours,
    });
  } catch (err) {
    console.error("Error fetching all tours:", err);
    res.status(500).json({ success: false, message: "Failed to get tours" });
  }
};

// Get featured tours
const getFeaturedTour = async (req, res) => {
  try {
    const featuredTours = await Tour.find({ featured: true });

    res.status(200).json({
      success: true,
      message: "Featured tours retrieved successfully",
      data: featuredTours,
    });
  } catch (err) {
    console.error("Error fetching featured tours:", err);
    res.status(500).json({ success: false, message: "Failed to get tours" });
  }
};

// Get tour count
const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();

    res.status(200).json({
      success: true,
      message: "Tour count retrieved successfully",
      data: tourCount,
    });
  } catch (err) {
    console.error("Error fetching tour count:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to get tours count" });
  }
};

module.exports = {
  createTour,
  updateTour,
  deleteTour,
  getSingleTour,
  getAllTour,
  getFeaturedTour,
  getTourCount,
};
