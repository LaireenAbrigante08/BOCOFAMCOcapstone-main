const db = require('../config/db');

const Member = {
    // Create a new member
    create: (
        cbNumber, firstName, middleName, lastName, address, dob, email, gender, 
        contactNumber, beneficiaries, emergencyName, emergencyRelationship, 
        emergencyAddress, emergencyContact, dateIssued, nickname, civilStatus, 
        age, placeOfBirth, nationality, religion, spouseName, spouseAge, 
        spouseOccupation, fatherName, motherName, parentAddress, numberOfChildren, 
        childrenInfo, educationalAttainment, occupation, otherIncome, annualIncome, 
        elementarySchool, elementaryAddress, elementaryYearGraduated, secondarySchool, 
        secondaryAddress, secondaryYearGraduated, collegeSchool, collegeAddress, 
        collegeYearGraduated, vocationalSchool, vocationalAddress, vocationalYearGraduated, 
        membershipDate, cooperativePosition, emergencyContactName, emergencyContactAddress, 
        relation, agrarianBeneficiary, farmArea, farmType, isTenant, recruitedBy, 
        signature, signedDate, callback
    ) => {
        const query = `
            INSERT INTO members (
                cb_number, first_name, middle_name, last_name, address, dob, email, 
                gender, contact_number, beneficiaries, emergency_name, emergency_relationship, 
                emergency_address, emergency_contact, date_issued, nickname, civil_status, 
                age, place_of_birth, nationality, religion, spouse_name, spouse_age, 
                spouse_occupation, father_name, mother_name, parent_address, number_of_children, 
                children_info, educational_attainment, occupation, other_income, annual_income, 
                elementary_school, elementary_address, elementary_year_graduated, secondary_school, 
                secondary_address, secondary_year_graduated, college_school, college_address, 
                college_year_graduated, vocational_school, vocational_address, vocational_year_graduated, 
                membership_date, cooperative_position, emergency_contact_name, emergency_contact_address, 
                relation, agrarian_beneficiary, farm_area, farm_type, is_tenant, recruited_by, 
                signature, signed_date
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            cbNumber, firstName, middleName, lastName, address, dob, email, gender, 
            contactNumber, beneficiaries, emergencyName, emergencyRelationship, 
            emergencyAddress, emergencyContact, dateIssued, nickname, civilStatus, 
            age, placeOfBirth, nationality, religion, spouseName, spouseAge, 
            spouseOccupation, fatherName, motherName, parentAddress, numberOfChildren, 
            childrenInfo, educationalAttainment, occupation, otherIncome, annualIncome, 
            elementarySchool, elementaryAddress, elementaryYearGraduated, secondarySchool, 
            secondaryAddress, secondaryYearGraduated, collegeSchool, collegeAddress, 
            collegeYearGraduated, vocationalSchool, vocationalAddress, vocationalYearGraduated, 
            membershipDate, cooperativePosition, emergencyContactName, emergencyContactAddress, 
            relation, agrarianBeneficiary, farmArea, farmType, isTenant, recruitedBy, 
            signature, signedDate
        ];

        db.query(query, values, callback);
    },
    // Get all members
    getAllMembers: (callback) => {
        const sql = "SELECT * FROM members"; // Ensure correct table name
        db.query(sql, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },
    // Find a member by cb_number
    findByCbNumber: (cbNumber) => {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM members WHERE cb_number = ?',
                [cbNumber],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results.length > 0 ? results[0] : null);
                }
            );
        });
    },

    findByCbNumber: (cbNumber) => {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM members WHERE cb_number = ?',
                [cbNumber],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results); // Laging array ang ibabalik
                    }
                }
            );
        });
    },
    

    // Update password for a user in the users table
    updatePassword: (cbNumber, newPassword) => {
        return new Promise((resolve, reject) => {
            db.query(
                'UPDATE users SET password = ? WHERE cb_number = ?',
                [newPassword, cbNumber],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                }
            );
        });
    }
};

module.exports = Member;
