const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel');

passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
        try {
            const user = await User.findOne({ email });
            
            if (!user || !user.isValidPassword(password)) {
                return done(null, false, { message: 'Invalid credentials' });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/Home',
    failureRedirect: '/',
}));

router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const newUser = await User.create({ name, email, password, role });
        req.login(newUser, (err) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            return res.status(201).json(newUser);
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;

