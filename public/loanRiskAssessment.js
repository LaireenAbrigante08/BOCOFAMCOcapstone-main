// Enhanced Risk Calculation Function
function calculateRisk(loanData, loanType) {
    try {
      let riskFactors = {};
      let defaultProbability = 0;
      
      if (loanType === 'salary_bonus') {
        // More sensitive salary loan risk factors
        const debtRatio = loanData.loan_amount / loanData.basic_monthly_salary;
        
        riskFactors = {
          debtToIncome: Math.min(1.5, debtRatio * 0.7), // Increased weight and range
          ageRisk: (loanData.age < 25) ? 0.25 : 
                  (loanData.age > 55) ? 0.3 : 
                  (loanData.age > 50) ? 0.15 : 0.05, // More age brackets
          serviceRisk: (loanData.length_of_service < 1) ? 0.3 : 
                      (loanData.length_of_service < 3) ? 0.15 : 
                      (loanData.length_of_service < 5) ? 0.05 : 0,
          existingDebt: (loanData.previous_balance > 0) ? 
                       Math.min(0.4, loanData.previous_balance / loanData.loan_amount * 0.5) : 0,
          savingsCoverage: 1 - Math.min(1.2, (loanData.bayanihan_savings / loanData.loan_amount) * 0.8),
          salaryStability: (loanData.length_of_service < 2) ? 0.2 : 0.05
        };
      } else {
        // Enhanced agricultural loan risk factors
        const incomeCoverageRatio = loanData.loan_amount / loanData.annual_income;
        
        riskFactors = {
          incomeCoverage: Math.min(1.5, incomeCoverageRatio * 0.8),
          incomeStability: (loanData.income_source === 'Seasonal') ? 0.3 : 
                         (loanData.income_source === 'Livestock') ? 0.15 : 0,
          capitalAdequacy: 1 - Math.min(1.2, (loanData.paid_up_capital / loanData.loan_amount) * 0.5),
          outstandingDebt: (loanData.outstanding_balance > 0) ? 
                         Math.min(0.5, loanData.outstanding_balance / loanData.loan_amount) : 0,
          savingsCoverage: 1 - Math.min(1.2, (loanData.bayanihan_savings / loanData.loan_amount) * 0.6),
          cropRisk: (loanData.income_source.includes('Perishable')) ? 0.2 : 0.1
        };
      }
      
      // More sensitive weights
      const weights = {
        salary_bonus: [0.5, 0.2, 0.15, 0.1, 0.05, 0.1], // Sum to 1.1 intentionally
        agricultural: [0.5, 0.2, 0.15, 0.1, 0.05, 0.1] // Sum to 1.1 intentionally
      };
      
      // Calculate weighted probability with normalization
      const factorValues = Object.values(riskFactors);
      const weightValues = weights[loanType];
      
      let rawScore = factorValues.reduce((sum, val, idx) => {
        return sum + (val * weightValues[idx]);
      }, 0);
      
      // Apply sigmoid function for better probability distribution
      defaultProbability = 1 / (1 + Math.exp(-(rawScore - 0.6) * 10));
      
      // Ensure probability is between 0.05 and 0.95
      defaultProbability = Math.max(0.05, Math.min(0.95, defaultProbability));
      
      // Enhanced risk level thresholds
      function getEnhancedRiskLevel(prob) {
        if (prob < 0.15) return 'Very Low';
        if (prob < 0.3) return 'Low';
        if (prob < 0.6) return 'Moderate';
        if (prob < 0.8) return 'High';
        return 'Very High';
      }
      
      return {
        loanType,
        defaultProbability,
        riskLevel: getEnhancedRiskLevel(defaultProbability),
        riskFactors,
        calculatedOn: new Date().toISOString(),
        debug: { rawScore } // Helpful for calibration
      };
    } catch (error) {
      throw new Error(`Risk calculation failed: ${error.message}`);
    }
  }
