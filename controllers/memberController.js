const bcrypt = require('bcrypt');
const Member = require('../models/Member'); // Ensure this model has the correct methods

// Render the change password page
exports.renderChangePasswordPage = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render('member/change-password', { error: null, success: null });
};

// Handle password update
exports.updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const userId = req.session.user.id; // Use ID instead of cb_number

        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.render('member/change-password', { error: "All fields are required.", success: null });
        }

        if (newPassword !== confirmPassword) {
            return res.render('member/change-password', { error: "New passwords do not match.", success: null });
        }

        const member = await Member.findById(userId); // Find by ID
        if (!member) {
            return res.render('member/change-password', { error: "User not found.", success: null });
        }

        // Compare current password with stored hashed password
        const isMatch = await bcrypt.compare(currentPassword, member.password);
        if (!isMatch) {
            return res.render('member/change-password', { error: "Current password is incorrect.", success: null });
        }

        // Hash new password before saving
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await Member.updatePassword(userId, hashedPassword); // Update password

        return res.render('member/change-password', { error: null, success: "Password updated successfully!" });
    } catch (error) {
        console.error("Password change error:", error);
        return res.render('member/change-password', { error: "Something went wrong! Please try again.", success: null });
    }
};

// Get Profile
exports.getProfile = async (req, res) => {
    console.log("Session Data:", req.session);

    if (!req.session.user || !req.session.user.cb_number) {
        console.log("User not logged in, redirecting to /login");
        return res.redirect('/login');
    }

    try {
        const cb_number = req.session.user.cb_number;
        console.log("Fetching profile for CB Number:", cb_number);

        const [member] = await Member.findByCbNumber(cb_number);

        if (!member) {
            return res.status(404).send('Member not found');
        }

        res.render('member/profile', { member });
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).send('Server Error');
    }
};
