const express = require('express');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/homeRoutes');

passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
        try {
            // Insert your user authentication logic here
        } catch (error) {
            return done(error);
        }
    }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    // Insert your user find logic here
});

const app = express();

app.use(express.static(path.join(__dirname, 'templates')));
app.use(session({
    secret: 'your secret here',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/home', homeRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/',
}));

app.post('/register', (req, res) => {
    // Insert your user registration logic here
    res.redirect('/home');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

