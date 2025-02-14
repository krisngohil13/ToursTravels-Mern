const User = require('../models/User');
const Tour = require('../models/Tour');
const Booking = require('../models/Booking');

// Get main dashboard statistics
exports.getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'user' });
        const totalTours = await Tour.countDocuments();
        const totalBookings = await Booking.countDocuments();

        const bookings = await Booking.aggregate([
            {
                $lookup: {
                    from: 'tours',
                    localField: 'tourName',
                    foreignField: 'title',
                    as: 'tour'
                }
            },
            {
                $unwind: '$tour'
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: { $multiply: ['$tour.price', '$groupSize'] }
                    }
                }
            }
        ]);

        const totalRevenue = bookings.length > 0 ? bookings[0].totalRevenue : 0;

        res.status(200).json({
            success: true,
            stats: {
                totalUsers,
                totalTours,
                totalBookings,
                totalRevenue
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch dashboard statistics',
            error: error.message
        });
    }
};

// Get recent bookings
exports.getRecentBookings = async (req, res) => {
    try {
        const recentBookings = await Booking.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('userId', 'username')
            .select('tourName fullName bookAt groupSize status');

        res.status(200).json({
            success: true,
            bookings: recentBookings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch recent bookings',
            error: error.message
        });
    }
};

// Get revenue statistics
exports.getRevenueStats = async (req, res) => {
    try {
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        // Get all bookings
        const bookings = await Booking.find();
        
        // Calculate total revenue
        const totalRevenue = bookings.reduce((acc, booking) => {
            return acc + (booking.groupSize * 100); // Assuming $100 per person
        }, 0);

        // Calculate monthly revenue
        const monthlyBookings = bookings.filter(booking => 
            booking.createdAt >= firstDayOfMonth
        );
        const monthlyRevenue = monthlyBookings.reduce((acc, booking) => {
            return acc + (booking.groupSize * 100);
        }, 0);

        // Calculate growth rate (comparing to previous month)
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastMonthBookings = bookings.filter(booking => 
            booking.createdAt >= lastMonth && booking.createdAt < firstDayOfMonth
        );
        const lastMonthRevenue = lastMonthBookings.reduce((acc, booking) => {
            return acc + (booking.groupSize * 100);
        }, 0);

        const growthRate = lastMonthRevenue === 0 ? 100 :
            ((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) * 100;

        res.status(200).json({
            success: true,
            data: {
                totalRevenue,
                monthlyRevenue,
                growthRate: Math.round(growthRate * 100) / 100
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch revenue statistics"
        });
    }
};

// Get user statistics
exports.getUserStats = async (req, res) => {
    try {
        const userStats = await User.aggregate([
            {
                $group: {
                    _id: {
                        month: { $month: '$createdAt' },
                        year: { $year: '$createdAt' }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { '_id.year': -1, '_id.month': -1 }
            },
            {
                $limit: 6
            }
        ]);

        res.status(200).json({
            success: true,
            userStats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user statistics',
            error: error.message
        });
    }
};

// Get tour statistics
exports.getTourStats = async (req, res) => {
    try {
        const tourStats = await Tour.aggregate([
            {
                $lookup: {
                    from: 'bookings',
                    localField: 'title',
                    foreignField: 'tourName',
                    as: 'bookings'
                }
            },
            {
                $project: {
                    title: 1,
                    price: 1,
                    bookingsCount: { $size: '$bookings' },
                    revenue: {
                        $multiply: [
                            '$price',
                            { $sum: '$bookings.groupSize' }
                        ]
                    }
                }
            },
            {
                $sort: { bookingsCount: -1 }
            },
            {
                $limit: 5
            }
        ]);

        res.status(200).json({
            success: true,
            tourStats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch tour statistics',
            error: error.message
        });
    }
}; 