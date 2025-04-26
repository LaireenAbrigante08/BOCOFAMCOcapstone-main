const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Enhanced database query helper
function queryAsync(sql, params) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) {
        console.error('Database Error:', {
          query: sql,
          parameters: params,
          error: err.message
        });
        return reject(new Error('Database operation failed'));
      }
      resolve(results);
    });
  });
}

// Main risk assessment endpoint
router.get('/:cb_number', async (req, res) => {
  try {
    const { cb_number } = req.params;

    // Input validation
    if (!cb_number || !/^[A-Za-z0-9]{6,20}$/.test(cb_number)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid CB number format (6-20 alphanumeric characters required)'
      });
    }

    // Step 1: Identify loan type
    const loanType = await identifyLoanType(cb_number);

    // Step 2: Fetch loan data
    const loanData = await fetchLoanData(cb_number, loanType);

    // Step 3: Calculate risk
    const riskAssessment = calculateRisk(loanData, loanType);

    res.json({
      success: true,
      ...riskAssessment
    });

  } catch (error) {
    console.error('Risk Assessment Error:', error.message);
    
    const statusCode = error.message.includes('not found') ? 404 : 500;
    res.status(statusCode).json({
      success: false,
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Loan type identification
async function identifyLoanType(cb_number) {
  try {
    const [salaryResult, agriResult] = await Promise.all([
      queryAsync('SELECT 1 FROM salary_bonuses_loans WHERE cb_number = ? LIMIT 1', [cb_number]),
      queryAsync('SELECT 1 FROM regular_agricultural_loans WHERE cb_number = ? LIMIT 1', [cb_number])
    ]);

    if (salaryResult.length > 0) return 'salary_bonus';
    if (agriResult.length > 0) return 'agricultural';
    
    throw new Error('Loan account not found');
  } catch (error) {
    throw new Error(`Could not identify loan type: ${error.message}`);
  }
}

// Data retrieval with existing schema
async function fetchLoanData(cb_number, loanType) {
  try {
    let query, params;

    if (loanType === 'salary_bonus') {
      query = `
        SELECT 
          s.age, 
          s.length_of_service, 
          s.basic_monthly_salary, 
          s.loan_amount,
          COALESCE(t.previous_balance, 0) AS previous_balance,
          COALESCE(t.bayanihan_savings, 0) AS bayanihan_savings
        FROM salary_bonuses_loans s
        LEFT JOIN salary_loan_transactions t ON s.cb_number = t.cb_number
        WHERE s.cb_number = ?
        ORDER BY t.transaction_date DESC
        LIMIT 1
      `;
      params = [cb_number];
    } else {
      query = `
        SELECT 
          r.loan_amount, 
          r.annual_income, 
          r.income_source, 
          COALESCE(r.paid_up_capital, 0) AS paid_up_capital,
          COALESCE(r.outstanding_balance, 0) AS outstanding_balance,
          COALESCE(t.bayanihan_savings, 0) AS bayanihan_savings
        FROM regular_agricultural_loans r
        LEFT JOIN salary_loan_transactions t ON r.cb_number = t.cb_number
        WHERE r.cb_number = ?
        ORDER BY t.transaction_date DESC
        LIMIT 1
      `;
      params = [cb_number];
    }

    const results = await queryAsync(query, params);
    
    if (!results || results.length === 0) {
      throw new Error('No loan data found for this account');
    }

    return results[0];
  } catch (error) {
    throw new Error(`Failed to fetch loan data: ${error.message}`);
  }
}

// Risk calculation (unchanged from your original)
function calculateRisk(loanData, loanType) {
  try {
    let riskFactors = {};
    let defaultProbability = 0;
    
    if (loanType === 'salary_bonus') {
      riskFactors = {
        debtToIncome: Math.min(1, (loanData.loan_amount / loanData.basic_monthly_salary) * 0.4),
        ageRisk: (loanData.age < 25 || loanData.age > 55) ? 0.15 : 0.05,
        serviceRisk: (loanData.length_of_service < 1) ? 0.2 : 
                    (loanData.length_of_service < 3 ? 0.1 : 0),
        existingDebt: (loanData.previous_balance > 0) ? 0.25 : 0,
        savingsCoverage: 1 - Math.min(1, (loanData.bayanihan_savings / loanData.loan_amount) * 0.5)
      };
    } else {
      riskFactors = {
        incomeCoverage: Math.min(1, (loanData.loan_amount / loanData.annual_income) * 0.5),
        incomeStability: (loanData.income_source === 'Seasonal') ? 0.2 : 0,
        capitalAdequacy: 1 - Math.min(1, (loanData.paid_up_capital / loanData.loan_amount) * 0.3),
        outstandingDebt: (loanData.outstanding_balance > 0) ? 0.3 : 0,
        savingsCoverage: 1 - Math.min(1, (loanData.bayanihan_savings / loanData.loan_amount) * 0.2)
      };
    }
    
    const weights = {
      salary_bonus: [0.4, 0.15, 0.15, 0.2, 0.1],
      agricultural: [0.4, 0.2, 0.2, 0.15, 0.05]
    };
    
    const factorValues = Object.values(riskFactors);
    defaultProbability = factorValues.reduce((sum, val, idx) => {
      return sum + (val * weights[loanType][idx]);
    }, 0);
    
    defaultProbability = Math.min(0.95, defaultProbability);
    
    return {
      loanType,
      defaultProbability,
      riskLevel: getRiskLevel(defaultProbability),
      riskFactors,
      calculatedOn: new Date().toISOString()
    };
  } catch (error) {
    throw new Error(`Risk calculation failed: ${error.message}`);
  }
}

function getRiskLevel(probability) {
  if (probability < 0.25) return 'Low';
  if (probability < 0.5) return 'Moderate';
  if (probability < 0.75) return 'High';
  return 'Very High';
}

module.exports = router;
