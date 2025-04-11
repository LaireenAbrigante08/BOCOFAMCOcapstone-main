const db = require('../config/db');

class Loan {
    static getAllRegularLoans(callback) {
        const query = 'SELECT * FROM regular_agricultural_loans';
        db.query(query, (err, results) => {
            if (err) {
                console.error('❌ Error fetching Regular Loans:', err);
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    static getAllSalaryBonusLoans(callback) {
        const query = 'SELECT * FROM salary_bonuses_loans';
        db.query(query, (err, results) => {
            if (err) {
                console.error('❌ Error fetching Salary/Bonuses Loans:', err);
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    // New method to get Salary/Bonus Loan by CB Number
    static getSalaryBonusLoanByCbNumber(cbNumber, callback) {
        const query = 'SELECT * FROM salary_bonuses_loans WHERE cb_number = ?';
        db.query(query, [cbNumber], (err, results) => {
            if (err) {
                console.error(`❌ Error fetching Salary/Bonuses Loan for CB Number ${cbNumber}:`, err);
                return callback(err, null);
            }
            // If no loan found, results will be an empty array
            if (results.length === 0) {
                return callback(null, null); // No loan found
            }
            callback(null, results[0]); // Return the first result (since cb_number should be unique)
        });
    }

// In models/loan.js
static getSalaryBonusLoanByCbNumber(cbNumber, callback) {
    const query = 'SELECT * FROM salary_loan_transactions WHERE cb_number = ?';
    db.query(query, [cbNumber], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0] || null);
    });
}

static createSalaryBonusLoan(
    cbNumber,
    loanType,
    loanAmount,
    previousBalance,
    newBalance,
    serviceFee,
    processingFee,
    totalDeductions,
    totalLoanReceived,
    applicationType,
    memberFee,
    shareCapital,
    bayanihanSavings,
    totalOrAmount,
    takeHomeAmount,
    callback
) {
    const query = `
        INSERT INTO salary_loan_transactions (
            cb_number,
            loan_type,
            loan_amount,
            previous_balance,
            new_balance,
            service_fee,
            processing_fee,
            total_deductions,
            total_loan_received,
            application_type,
            member_fee,
            share_capital,
            bayanihan_savings,
            total_or_amount,
            take_home_amount
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    db.query(query, [
        cbNumber,
        loanType,
        loanAmount,
        previousBalance,
        newBalance,
        serviceFee,
        processingFee,
        totalDeductions,
        totalLoanReceived,
        applicationType,
        memberFee,
        shareCapital,
        bayanihanSavings,
        totalOrAmount,
        takeHomeAmount
    ], callback);
}

static updateSalaryBonusLoan(
    cbNumber,
    loanType,
    loanAmount,
    previousBalance,
    newBalance,
    serviceFee,
    processingFee,
    totalDeductions,
    totalLoanReceived,
    applicationType,
    memberFee,
    shareCapital,
    bayanihanSavings,
    totalOrAmount,
    takeHomeAmount,
    callback
) {
    const query = `
        UPDATE salary_loan_transactions SET
            loan_type = ?,
            loan_amount = ?,
            previous_balance = ?,
            new_balance = ?,
            service_fee = ?,
            processing_fee = ?,
            total_deductions = ?,
            total_loan_received = ?,
            application_type = ?,
            member_fee = ?,
            share_capital = ?,
            bayanihan_savings = ?,
            total_or_amount = ?,
            take_home_amount = ?
        WHERE cb_number = ?
    `;
    
    db.query(query, [
        loanType,
        loanAmount,
        previousBalance,
        newBalance,
        serviceFee,
        processingFee,
        totalDeductions,
        totalLoanReceived,
        applicationType,
        memberFee,
        shareCapital,
        bayanihanSavings,
        totalOrAmount,
        takeHomeAmount,
        cbNumber
    ], callback);
}
}

module.exports = Loan;
