const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Middleware to check if the user is authenticated as an admin
const isAuthenticatedAdmin = (req, res, next) => {
    if (!req.session || !req.session.user || req.session.user.role !== 'admin') {
        return res.redirect('/login');
    }
    next();
};

// Admin Dashboard Route
router.get('/dashboard', isAuthenticatedAdmin, adminController.adminDashboard);

// Register Member Routes
router.get('/register', isAuthenticatedAdmin, adminController.renderRegisterPage);
router.post('/register', isAuthenticatedAdmin, adminController.registerMember);

// Change Password Routes
router.get('/change-password', isAuthenticatedAdmin, adminController.renderChangePasswordPage);
router.post('/change-password', isAuthenticatedAdmin, adminController.updatePassword);

// Route to render the members list page
router.get("/members-list", adminController.renderMembersList);

router.get('/loan-regular', isAuthenticatedAdmin, adminController.renderRegularLoanForm);
router.get('/loan-salary_bonuses', isAuthenticatedAdmin, adminController.renderLoanSalaryBonuses);

// Regular Agricultural Loans Page
router.get('/regular_agricultural_loans', adminController.getRegularLoans);

router.get('/salary_bonuses_loans', adminController.getSalaryBonusesLoans);

// Add this with your other routes
router.post('/save-salary-bonus-loan', isAuthenticatedAdmin, adminController.saveSalaryBonusLoan);

module.exports = router;
