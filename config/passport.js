const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./db');

passport.use(new LocalStrategy({
    usernameField: 'cb_number',
    passwordField: 'password'
}, async (cb_number, password, done) => {
    try {
        const [user] = await db.query('SELECT * FROM users WHERE cb_number = ?', [cb_number]);
        if (!user) return done(null, false);
        
        // Add your password verification logic here
        if (password !== user.password) { // Replace with bcrypt in production
            return done(null, false);
        }
        
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => done(null, user.cb_number));
passport.deserializeUser(async (cb_number, done) => {
    try {
        const [user] = await db.query('SELECT * FROM users WHERE cb_number = ?', [cb_number]);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;
