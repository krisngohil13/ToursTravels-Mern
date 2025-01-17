const express = require('express');
const { createBooking, getBookingsByUserId, getAllBookings, deleteBooking } = require('../controllers/bookingController.js');
const { verifyUser, verifyAdmin } = require('../utils/verifyToken.js');

const router = express.Router();

const bookingHandlers = {
    create: createBooking,
    getOne: getBookingsByUserId,   // Get bookings by userId (as updated in your controller)
    getAll: getAllBookings,
    delete: deleteBooking,
};

// Route to create a new booking
router.post('/', bookingHandlers.create);

// Route to get all bookings of the logged-in user
router.get('/user', verifyUser, bookingHandlers.getOne); // Use `verifyUser` to ensure only the logged-in user can fetch their bookings

// Route to get all bookings (Admin only)
router.get('/', verifyAdmin, bookingHandlers.getAll);

// Route to delete a booking by _id (same as before)
router.delete('/:id', bookingHandlers.delete);

module.exports = router;
