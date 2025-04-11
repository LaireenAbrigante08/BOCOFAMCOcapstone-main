const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); 

// Login Routes
router.get('/login', authController.showLoginPage);
router.post('/login', authController.login);

// Logout Route
router.get('/logout', authController.logout);

// Register Routes (General)
router.get('/register', authController.showRegisterPage);
router.post('/register', authController.registerUser);

// Forgot Password Routes
router.get('/forgot-password', authController.showForgotPasswordPage); // Show the password reset page
router.post('/forgot-password', authController.handleForgotPassword); // Handle password reset request

// In your router (authRouter.js)
router.get('/reset-password/:token', authController.showResetPasswordPage);
// In your router (authRouter.js)
router.post('/reset-password', authController.handleResetPassword);


module.exports = router;
