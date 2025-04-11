const bcrypt = require('bcrypt');

const password = 'Admin@123'; // Palitan ng gusto mong password
bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
        console.error('Error hashing password:', err);
    } else {
        console.log('🔑 Hashed Password:', hash);
    }
});
