const Tour = require("../models/Tour.js");

// Create new tour
const createTour = async (req, res) => {
  try {
    const newTour = new Tour(req.body); // Simplified initialization using req.body
    const savedTour = await newTour.save();

    res.status(201).json({
      success: true,
      message: "Successfully created",
      data: savedTour,
    });
  } catch (err) {
    console.error("Error creating tour:", err);
    res.status(500).json({ success: false, message: "Failed to create tour" });
  }
};

// Update tour
const updateTour = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      { $set: req.body }, // Directly use req.body
      { new: true, runValidators: true } // runValidators ensures validation is applied during updates
    );

    if (!updatedTour) {
      return res.status(404).json({ success: false, message: "Tour not found" });
    }

    res.status(200).json({
      success: true,
      message: "Tour updated successfully",
      data: updatedTour,
    });
  } catch (err) {
    console.error("Error updating tour:", err);
    res.status(500).json({ success: false, message: "Failed to update tour" });
  }
};

// Delete tour
const deleteTour = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTour = await Tour.findByIdAndDelete(id);

    if (!deletedTour) {
      return res.status(404).json({ success: false, message: "Tour not found" });
    }

    res.status(200).json({
      success: true,
      message: "Tour deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting tour:", err);
    res.status(500).json({ success: false, message: "Failed to delete tour" });
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
