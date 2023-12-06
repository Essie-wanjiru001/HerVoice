const express = require('express');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const mongoose = require('mongoose');
const User = require('./models/userModel');
const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/homeRoutes');
const userRoutes = require('./routes/userRoutes');
const discussionsRoutes = require('./routes/discussionsRoutes');
const storyRoutes = require('./routes/storyRoutes');

mongoose.connect('mongodb+srv://essie-001:Essiewanjiru001**@hervoice.sel1nvo.mongodb.net/hervoice?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
	tls: true
});

passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({ email: username }, (err, user) => {
      if (err) { return done(err); }
      if (user) { return done(null, false, { message: 'Email already exists.' }); }

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      });

      newUser.save((err) => {
        if (err) {
          return done(null, false, { message: 'Error registering user.' });
        }
        return done(null, newUser);
      });
    });
  }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
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
app.use('/users', userRoutes);
app.use('/discussions', discussionsRoutes);
app.use('/stories', storyRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/',
}));

app.post('/register', (req, res) => {
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/',
  })(req, res);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

