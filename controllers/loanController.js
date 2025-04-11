const db = require("../config/db");

exports.submitRegularLoan = (req, res) => {
    console.log("📌 Received Data:", req.body);

    const {
        cb_number,
        application_no,
        date_of_application, // Change to match frontend
        spouse_name,
        address, // Change to match frontend
        contact_no, // Change to match frontend
        account_no,
        coop_id,
        loan_type,
        loan_amount,
        annual_income,
        source_of_income, // Change to match frontend
        security_offered, // Change to match frontend
        purpose, // Change to match frontend
        paid_up_capital,
        previous_loan,
        outstanding_balance,
        cbu_status,
        borrower_category, // Change to match frontend
        loan_balance_status // Change to match frontend
    } = req.body;

    // Map the fields correctly
    const application_date = date_of_application;
    const member_address = address;
    const contact_number = contact_no;
    const income_source = source_of_income;
    const collateral = security_offered;
    const loan_purpose = purpose;
    const borrower_type = borrower_category;
    const loan_status = loan_balance_status;

    // Check for missing required fields
    const missingFields = [];
    if (!cb_number) missingFields.push("cb_number");
    if (!application_no) missingFields.push("application_no");
    if (!application_date) missingFields.push("application_date");
    if (!member_address) missingFields.push("member_address");
    if (!contact_number) missingFields.push("contact_number");
    if (!loan_type) missingFields.push("loan_type");
    if (!loan_amount) missingFields.push("loan_amount");
    if (!cbu_status) missingFields.push("cbu_status");
    if (!borrower_type) missingFields.push("borrower_type");
    if (!loan_status) missingFields.push("loan_status");

    if (missingFields.length > 0) {
        console.log(`❌ Missing Fields: ${missingFields.join(", ")}`);
        return res.json({ success: false, message: `Missing fields: ${missingFields.join(", ")}` });
    }

    const sql = `INSERT INTO regular_agricultural_loans 
                (cb_number, application_no, application_date, spouse_name, member_address, contact_number, account_number, coop_id_number, loan_type, loan_amount, annual_income, income_source, collateral, loan_purpose, paid_up_capital, previous_loan_amount, outstanding_balance, cbu_status, borrower_type, loan_status, application_status) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')`;

    db.query(sql, [
        cb_number,
        application_no,
        application_date,
        spouse_name || null,
        member_address,
        contact_number,
        account_no || null,
        coop_id || null,
        loan_type,
        loan_amount,
        annual_income || null,
        income_source || null,
        collateral || null,
        loan_purpose || null,
        paid_up_capital || null,
        previous_loan || null,
        outstanding_balance || null,
        cbu_status,
        borrower_type,
        loan_status
    ], (err, result) => {
        if (err) {
            console.error("❌ Error inserting data into database:", err.sqlMessage);
            return res.json({ success: false, message: "Failed to submit loan application. Please try again." });
        }

        console.log("✅ Loan application submitted successfully:", result.insertId);
        return res.json({ success: true, message: "Loan application submitted successfully!" });
    });
};


exports.submitSalaryBonusLoan = (req, res) => {
    console.log("📌 Received Data:", req.body);

    const {
        cb_number,
        application_no,
        date, // Change to match frontend
        last_name,
        first_name,
        middle_initial,
        municipality,
        position,
        length_of_service,
        age,
        address,
        office_agency,
        basic_monthly_salary,
        net_take_home_pay,
        spouse_name,
        contact_no,
        loan_type,
        loan_amount
    } = req.body;

    // Map frontend fields correctly
    const application_date = date;

    // Check for missing required fields
    const missingFields = [];
    if (!cb_number) missingFields.push("cb_number");
    if (!application_no) missingFields.push("application_no");
    if (!application_date) missingFields.push("application_date");
    if (!last_name) missingFields.push("last_name");
    if (!first_name) missingFields.push("first_name");
    if (!position) missingFields.push("position");
    if (!address) missingFields.push("address");
    if (!contact_no) missingFields.push("contact_no");
    if (!loan_type) missingFields.push("loan_type");
    if (!loan_amount) missingFields.push("loan_amount");

    if (missingFields.length > 0) {
        console.log(`❌ Missing Fields: ${missingFields.join(", ")}`);
        return res.json({ success: false, message: `Missing fields: ${missingFields.join(", ")}` });
    }

    const sql = `INSERT INTO salary_bonuses_loans 
                (cb_number, application_no, application_date, last_name, first_name, middle_initial, municipality, position, length_of_service, age, address, office_agency, basic_monthly_salary, net_take_home_pay, spouse_name, contact_no, loan_type, loan_amount, application_status) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')`;

    db.query(sql, [
        cb_number,
        application_no,
        application_date,
        last_name,
        first_name,
        middle_initial || null,
        municipality || null,
        position,
        length_of_service || null,
        age || null,
        address,
        office_agency || null,
        basic_monthly_salary || null,
        net_take_home_pay || null,
        spouse_name || null,
        contact_no,
        loan_type,
        loan_amount
    ], (err, result) => {
        if (err) {
            console.error("❌ Error inserting data into database:", err.sqlMessage);
            return res.json({ success: false, message: "Failed to submit loan application. Please try again." });
        }

        console.log("✅ Salary/Bonuses Loan application submitted successfully:", result.insertId);
        return res.json({ success: true, message: "Loan application submitted successfully!" });
    });
};