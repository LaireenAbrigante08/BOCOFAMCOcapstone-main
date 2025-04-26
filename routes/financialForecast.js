const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
    const user = req.session.user;
    
    if (!user || !user.cb_number) {
        return res.redirect('/login');
    }

    const cb_number = user.cb_number;
    console.log(`Generating forecast for ${cb_number}`);

    const results = {};
    let queriesCompleted = 0;
    const totalQueries = 3; // salary, agricultural loans, and transactions

    function checkCompletion() {
        queriesCompleted++;
        if (queriesCompleted === totalQueries) {
            processResults();
        }
    }

    function processResults() {
        try {
            const salaryData = results.salary[0] || {};
            const agriLoans = results.agriLoans || [];
            const transactions = results.transactions || [];
            
            // Calculate financial metrics
            const basicSalary = parseFloat(salaryData.basic_monthly_salary) || 0;
            const totalAgriLoans = agriLoans.reduce((sum, loan) => sum + (parseFloat(loan.loan_amount) || 0), 0);
            
            // Calculate from transaction table (using only specified columns)
            const totalLoanPayments = transactions.reduce((sum, t) => sum + (parseFloat(t.loan_amount) || 0), 0);
            const totalSavings = transactions.reduce((sum, t) => sum + (parseFloat(t.bayanihan_savings) || 0), 0);
            const totalShareCapital = transactions.reduce((sum, t) => sum + (parseFloat(t.share_capital) || 0), 0);
            const outstandingBalance = transactions.length > 0 ? 
                parseFloat(transactions[0].previous_balance) || 0 : 0;

            const forecast = {
                basicSalary: basicSalary,
                projectedSalary: basicSalary * 12 * 1.05, // 5% annual growth
                loanCapacity: basicSalary * 0.3 * 12, // 30% of monthly salary
                totalLoans: totalAgriLoans,
                totalLoanPayments: totalLoanPayments,
                outstandingBalance: outstandingBalance,
                totalSavings: totalSavings,
                totalShareCapital: totalShareCapital,
                debtToIncome: basicSalary > 0 ? outstandingBalance / (basicSalary * 12) : 0,
                lastTransactionType: transactions[0]?.loan_type || 'None'
            };
            
            res.render('financialForecast', {
                title: 'Financial Forecast',
                forecast,
                user
            });

        } catch (err) {
            console.error('Processing error:', err);
            res.status(500).render('error', {
                message: 'Failed to generate forecast',
                error: process.env.NODE_ENV === 'development' ? err : null
            });
        }
    }

    // 1. Get salary data
    db.query(
        'SELECT basic_monthly_salary FROM salary_bonuses_loans WHERE cb_number = ?', 
        [cb_number],
        (err, salaryResults) => {
            if (err) {
                console.error('Salary query failed:', err);
                return res.status(500).send('Error loading salary data');
            }
            results.salary = salaryResults;
            checkCompletion();
        }
    );

    // 2. Get agricultural loans
    db.query(
        'SELECT loan_amount FROM regular_agricultural_loans WHERE cb_number = ?',
        [cb_number],
        (err, agriResults) => {
            if (err) {
                console.error('Agricultural loans query failed:', err);
                return res.status(500).send('Error loading agricultural loans');
            }
            results.agriLoans = agriResults;
            checkCompletion();
        }
    );

    // 3. Get transactions (only specified columns)
    db.query(
        `SELECT 
            loan_type,
            loan_amount,
            previous_balance,
            share_capital,
            bayanihan_savings
         FROM salary_loan_transactions 
         WHERE cb_number = ? 
         ORDER BY transaction_date DESC`,
        [cb_number],
        (err, transactionResults) => {
            if (err) {
                console.error('Transactions query failed:', err);
                results.transactions = [];
            } else {
                results.transactions = transactionResults;
            }
            checkCompletion();
        }
    );
});

module.exports = router;
