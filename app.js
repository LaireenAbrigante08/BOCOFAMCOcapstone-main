const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const upload = multer(); // For parsing multipart/form-data
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const memberRoutes = require('./routes/memberRoutes');
const loanRoutes = require("./routes/loanRoutes"); // Loan routes

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Serve Static Files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, 'public')));
app.use(upload.none());


// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Debugging middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`📌 ${req.method} request to ${req.url}`);
    next();
});

// Routes
app.use('/', authRoutes);
app.use('/admin', adminRoutes);
app.use('/member', memberRoutes);
app.use("/member", loanRoutes);
app.use('/api', loanRoutes);

// Default route
app.get('/', (req, res) => res.redirect('/login'));

// 404 Error Handling (Improved)
app.use((req, res) => {
    console.error(`❌ 404 Not Found: ${req.method} ${req.url}`);
    res.status(404).render('404', { url: req.url });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
