const express = require('express');
const { 
    getDashboardStats, 
    getRecentBookings, 
    getRevenueStats,
    getUserStats,
    getTourStats 
} = require('../controllers/adminController');
const { verifyAdmin } = require('../utils/verifyToken');

const router = express.Router();

// Dashboard routes
router.get('/dashboard-stats', verifyAdmin, getDashboardStats);
router.get('/recent-bookings', verifyAdmin, getRecentBookings);
router.get('/revenue-stats', verifyAdmin, getRevenueStats);
router.get('/user-stats', verifyAdmin, getUserStats);
router.get('/tour-stats', verifyAdmin, getTourStats);

module.exports = router; 