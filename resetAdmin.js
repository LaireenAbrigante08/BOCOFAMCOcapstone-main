const bcrypt = require('bcrypt');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'capstone1'
});

const newPassword = 'Admin@123'; // Bagong password
bcrypt.hash(newPassword, 10, (err, hash) => {
    if (err) {
        console.error('❌ Error hashing password:', err);
    } else {
        db.query(
            'UPDATE users SET password = ? WHERE cb_number = ?',
            [hash, 'ADMIN12345'],
            (err, result) => {
                if (err) {
                    console.error('❌ Database error:', err);
                } else {
                    console.log('✅ Password updated successfully for ADMIN12345');
                }
                db.end();
            }
        );
    }
});
