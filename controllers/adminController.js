const bcrypt = require('bcrypt');
const User = require('../models/User');
const Member = require('../models/Member');
const Loan = require('../models/loan');


exports.adminDashboard = (req, res) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.redirect('/login');
    }
    res.render('admin/dashboard');
};

// This function should be added to render the registration page
exports.renderRegisterPage = (req, res) => {
    res.render('admin/register', { error: null }); // ✅ Ensure `error` is always passed
};


exports.registerMember = async (req, res) => {
    try {
        const { 
            cb_number, password, role, first_name, middle_name, last_name, 
            address, dob, email, gender, contact_number, beneficiaries, 
            emergency_name, emergency_relationship, emergency_address, 
            emergency_contact, date_issued, nickname, civil_status, age, 
            place_of_birth, nationality, religion, spouse_name, spouse_age, 
            spouse_occupation, father_name, mother_name, parent_address, 
            number_of_children, children_info, educational_attainment, 
            occupation, other_income, annual_income, elementary_school, 
            elementary_address, elementary_year_graduated, secondary_school, 
            secondary_address, secondary_year_graduated, college_school, 
            college_address, college_year_graduated, vocational_school, 
            vocational_address, vocational_year_graduated, membership_date, 
            cooperative_position, emergency_contact_name, emergency_contact_address, 
            relation, agrarian_beneficiary, farm_area, farm_type, is_tenant, 
            recruited_by, signature, signed_date 
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into users table
        User.create(cb_number, hashedPassword, role, (err) => {
            if (err) {
                console.error("Error inserting into users table:", err);
                return res.status(500).render('admin/register', { error: "Error registering user" });
            }

            // Insert into members table
            Member.create(
                cb_number, first_name, middle_name, last_name, address, dob, email, 
                gender, contact_number, beneficiaries, emergency_name, emergency_relationship, 
                emergency_address, emergency_contact, date_issued, nickname, civil_status, 
                age, place_of_birth, nationality, religion, spouse_name, spouse_age, 
                spouse_occupation, father_name, mother_name, parent_address, 
                number_of_children, children_info, educational_attainment, occupation, 
                other_income, annual_income, elementary_school, elementary_address, 
                elementary_year_graduated, secondary_school, secondary_address, 
                secondary_year_graduated, college_school, college_address, 
                college_year_graduated, vocational_school, vocational_address, 
                vocational_year_graduated, membership_date, cooperative_position, 
                emergency_contact_name, emergency_contact_address, relation, 
                agrarian_beneficiary, farm_area, farm_type, is_tenant, recruited_by, 
                signature, signed_date, (err) => {
                    if (err) {
                        console.error("Error inserting into members table:", err);
                        return res.status(500).render('admin/register', { error: "Error registering member" });
                    }
                    res.redirect('/admin/dashboard');
                }
            );
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).render('admin/register', { error: "Something went wrong!" });
    }
};

// Render the change password page
exports.renderChangePasswordPage = (req, res) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.redirect('/login');
    }
    res.render('admin/change-password', { error: null, success: null });
};

// Update admin password
exports.updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const userId = req.session.user.cb_number;

        if (newPassword !== confirmPassword) {
            return res.render('admin/change-password', { error: "Passwords do not match", success: null });
        }

        // Find admin by cb_number
        User.findByUserId(userId, async (err, user) => {
            if (err || !user) {
                return res.render('admin/change-password', { error: "User not found", success: null });
            }

            // Check if the current password matches
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.render('admin/change-password', { error: "Current password is incorrect", success: null });
            }

            // Hash new password and update
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            User.updatePassword(userId, hashedPassword, (err) => {
                if (err) {
                    console.error("Error updating password:", err);
                    return res.render('admin/change-password', { error: "Error updating password", success: null });
                }
                res.render('admin/change-password', { error: null, success: "Password updated successfully!" });
            });
        });
    } catch (error) {
        console.error("Password change error:", error);
        res.render('admin/change-password', { error: "Something went wrong!", success: null });
    }
};
console.log("Member Model:", Member); // Debugging

exports.renderMembersList = (req, res) => {
    console.log("Checking Member.getAllMembers:", typeof Member.getAllMembers);

    if (typeof Member.getAllMembers !== "function") {
        return res.status(500).send("❌ Member.getAllMembers is not defined.");
    }

    Member.getAllMembers((err, results) => {
        if (err) {
            console.error("❌ Error fetching members:", err);
            return res.status(500).send("Failed to fetch members.");
        }
        res.render("admin/members-list", { members: results });
    });
};

exports.renderRegularLoanForm = (req, res) => {
    res.render('admin/loan-regular'); // Render the Regular/Agricultural Loan form
};
exports.renderLoanSalaryBonuses = (req, res) => {
    const cbNumber = req.query.cbNumber;
    
    if (cbNumber) {
        // Fetch existing loan data if CB Number is provided
        Loan.getSalaryBonusLoanByCbNumber(cbNumber, (err, loanData) => {
            if (err) {
                console.error("Error fetching loan data:", err);
                return res.render('admin/loan-salary_bonuses', { 
                    error: "Error loading loan data",
                    loan: null 
                });
            }
            
            res.render('admin/loan-salary_bonuses', { 
                loan: loanData || null,
                error: null
            });
        });
    } else {
        // Render empty form for new loan
        res.render('admin/loan-salary_bonuses', { 
            loan: null,
            error: null 
        });
    }
};

// Fetch and display Regular Agricultural Loans
exports.getRegularLoans = (req, res) => {
    Loan.getAllRegularLoans((err, loans) => {
        if (err) {
            console.error("❌ Error fetching loans:", err);
            return res.status(500).send("Server error");
        }
        res.render('admin/regular_agricultural_loans', { loans });
    });
};

exports.getSalaryBonusesLoans = (req, res) => {
    Loan.getAllSalaryBonusLoans((err, loans) => {
        if (err) {
            console.error("❌ Error fetching salary/bonuses loans:", err);
            return res.status(500).send("Server error");
        }
        res.render('admin/salary_bonuses_loans', { loans });
    });
};

// In controllers/adminController.js
exports.saveSalaryBonusLoan = async (req, res) => {
    try {
        const {
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
        } = req.body;

        // Validate required fields
        if (!cbNumber || isNaN(loanAmount) || isNaN(previousBalance)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Missing required fields' 
            });
        }

        // Check if a record already exists for this CB number
        Loan.getSalaryBonusLoanByCbNumber(cbNumber, (err, existingLoan) => {
            if (err) {
                console.error("Error checking for existing loan:", err);
                return res.status(500).json({ 
                    success: false, 
                    message: 'Error checking for existing loan' 
                });
            }

            if (existingLoan) {
                // Update existing record
                Loan.updateSalaryBonusLoan(
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
                    (err) => {
                        if (err) {
                            console.error("Error updating loan:", err);
                            return res.status(500).json({ 
                                success: false, 
                                message: 'Error updating loan' 
                            });
                        }
                        res.json({ 
                            success: true,
                            message: 'Loan updated successfully'
                        });
                    }
                );
            } else {
                // Insert new record
                Loan.createSalaryBonusLoan(
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
                    (err) => {
                        if (err) {
                            console.error("Error creating loan:", err);
                            return res.status(500).json({ 
                                success: false, 
                                message: 'Error creating loan' 
                            });
                        }
                        res.json({ 
                            success: true,
                            message: 'Loan created successfully'
                        });
                    }
                );
            }
        });
    } catch (error) {
        console.error('Error saving loan:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error' 
        });
    }
};
exports.renderRegularLoanForm = async (req, res) => {
    try {
        const cbNumber = req.query.cbNumber;
        let loan = {};
        
        if (cbNumber) {
            loan = await new Promise((resolve, reject) => {
                Loan.getRegularAgriculturalLoanByCbNumber(cbNumber, (err, result) => {
                    if (err) reject(err);
                    resolve(result || {});
                });
            });
        }
        
        res.render('admin/loan-regular', {
            currentPage: 'loan-applications',
            cbNumber: cbNumber || '',
            loan: loan
        });
    } catch (error) {
        console.error('Error:', error);
        res.render('admin/loan-regular', {
            currentPage: 'loan-applications',
            cbNumber: req.query.cbNumber || '',
            loan: {}
        });
    }
};
module.exports = exports;
