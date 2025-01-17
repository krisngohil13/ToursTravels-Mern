const Booking = require("../models/Booking.js");
const User = require("../models/User.js");

// Create a new booking
const createBooking = async (req, res) => {
    console.log("Received Booking Data:", req.body);  // Add this to log the received data
  
    const { userId, username, userEmail, tourName, fullName, groupSize, phone, bookAt } = req.body;
  
    // Ensure the required fields are present
    if (!userId || !tourName || !fullName || !groupSize || !phone || !bookAt) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
  
    try {
      // Fetch the username of the user based on the userId
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      // Create the booking with username
      const newBooking = new Booking({
        userId,
        username: user.username,  // Store username directly in the booking
        userEmail,
        tourName,
        fullName,
        groupSize: Number(groupSize), // Convert groupSize to a number
        phone,
        bookAt: new Date(bookAt), // Ensure bookAt is converted to a Date object
      });
  
      const savedBooking = await newBooking.save();
      res.status(200).json({
        success: true,
        message: "Your Tour is Booked",
        data: savedBooking,
      });
    } catch (error) {
      console.error("Error while creating booking:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };
  

// Get all bookings by userId (to fetch all bookings for a logged-in user)
const getBookingsByUserId = async (req, res) => {
  const userId = req.user._id;  // Assuming the userId comes from the authenticated user's data (e.g., from JWT payload)

  try {
    // Fetch all bookings for the logged-in user
    const bookings = await Booking.find({ userId: userId });

    if (bookings.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No bookings found for this user",
      });
    }

    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: bookings,
    });
  } catch (error) {
    console.error("Error retrieving bookings:", error);
    res.status(500).json({ success: false, message: "Failed to get bookings" });
  }
};

// Delete a single booking by _id
const deleteBooking = async (req, res) => {
  const bookingId = req.params.id;  // _id is passed in the URL

  try {
    const booking = await Booking.findByIdAndDelete(bookingId); // Delete booking by _id
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
      data: booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to delete booking" });
  }
};

// Get all bookings (admin route, for example)
const getAllBookings = async (req, res) => {
    try {
      const bookings = await Booking.find(); // Fetch all bookings for admin
      res.status(200).json({
        success: true,
        message: "All bookings retrieved successfully",
        data: bookings,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to get bookings" });
    }
  };

module.exports = { createBooking, getBookingsByUserId, deleteBooking, getAllBookings };
