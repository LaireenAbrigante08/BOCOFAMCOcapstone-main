// middleware/auth.js
module.exports = {
    ensureAuthenticated: (req, res, next) => {
        // Check if user exists in session (no Passport needed)
        if (req.session && req.session.user) {
            return next();
        }
        
        // If not authenticated
        res.redirect('/login');
    },
    
    ensureAdmin: (req, res, next) => {
        if (req.session && req.session.user && req.session.user.role === 'admin') {
            return next();
        }
        res.redirect('/login');
    }
};