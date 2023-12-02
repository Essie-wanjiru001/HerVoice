const express = require('express');
const router = express.Router();
const User = require('./userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
   try {
      const user = new User(req.body);
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
});

router.post('/login', async (req, res) => {
   try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
         return res.status(400).json({ error: 'Invalid credentials' });
      }

      const isPasswordMatch = await user.comparePassword(req.body.password);
      if (!isPasswordMatch) {
         return res.status(400).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token, userId: user._id });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

module.exports = router;
