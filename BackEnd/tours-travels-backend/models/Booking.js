const mongoose = require('mongoose');

// Define the schema for the booking collection
const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // User ID as ObjectId
      ref: 'User', // Referencing the User model
      required: true,
    },
    username: {
      type: String,  // Adding the username field
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    tourName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    groupSize: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,  // Changed from Number to String
      required: true,
    },
    bookAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the Booking model based on the schema
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
