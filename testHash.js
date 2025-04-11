const bcrypt = require('bcrypt');

const inputPassword = 'Admin@123'; // Dapat ito ang password na tina-try mo sa login
const storedHash = '$2b$10$GaV/JApi108ShGJXxjSQOODYLpIAB6z60mN2VMuxFSqG/278SPygm'; // Palitan ito ng exact hash mula sa database

bcrypt.compare(inputPassword, storedHash, (err, isMatch) => {
    if (err) {
        console.error('❌ Error comparing password:', err);
    } else {
        console.log('✅ Password Match:', isMatch);
    }
});
