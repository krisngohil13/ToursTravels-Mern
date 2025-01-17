const express = require('express');
const { registerUser, loginUser } = require('../controllers/authContorller');
const { body, validationResult } = require('express-validator'); // For input validation

const authRoute = express.Router();

// Register a new user with validation
authRoute.post(
  '/register',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('username').notEmpty().withMessage('Username is required'),
  ],
  async (req, res) => {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    // Call the registerUser controller
    await registerUser(req, res);
  }
);

// Login user with validation
authRoute.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    // Call the loginUser controller
    await loginUser(req, res);
  }
);

module.exports = authRoute;
