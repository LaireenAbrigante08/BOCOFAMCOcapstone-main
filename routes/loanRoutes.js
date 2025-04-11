const express = require("express");
const router = express.Router();
const loanController = require("../controllers/loanController");
const Loan = require('../models/loan');

// Route to handle Regular Agricultural Loan form submission
router.post("/loan-regular", loanController.submitRegularLoan);

// 📌 New Route for Salary/Bonuses Loan Submission
router.post("/loan-salary", loanController.submitSalaryBonusLoan);

// Eto yung hinahanap mo na route para sa /api/loan-details
router.get('/loan-details', (req, res) => {
    const cbNumber = req.query.cbNumber;
    if (!cbNumber) {
        return res.status(400).json({ error: 'cbNumber is required' });
    }

    Loan.getSalaryBonusLoanByCbNumber(cbNumber, (err, loan) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (!loan) {
            return res.status(404).json({ error: 'Loan not found' });
        }
        res.json(loan);
    });
});

module.exports = router;
