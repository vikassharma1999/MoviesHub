const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
// @API end point POST /api/user/signup
// @desc end point for user signup
// @access Public
router.post(
  '/signup',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Please add password with minimum 6 char').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, email, password } = req.body;
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User is already exists' });
      }
      const newUser = {
        name,
        email,
        password,
      };
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);
      user = new User(newUser);
      await user.save(user);
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(payload, process.env.JWTSECRET, (err, token) => {
        if (err) throw err;
        res.cookie('token', token, { expire: new Date() + 9999 });
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error!');
    }
  }
);

// @API end point POST /api/user/signin
// @desc end point for user signin
// @access Public
router.post(
  '/signin',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invaild Credentials' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      //   console.log(isMatch);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invaild Credentials' });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(payload, process.env.JWTSECRET, (err, token) => {
        if (err) throw err;
        res.cookie('token', token, { expire: new Date() + 9999 });
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @API end point GET /api/user/signout
// @desc end point for user signout
// @access Private
router.get('/signout', (req, res) => {
  res.clearCookie('token');
  res.json({
    message: 'user signout success..',
  });
});
module.exports = router;
