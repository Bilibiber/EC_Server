const router = require('express').Router();
const User = require('../model/userModel');
const {registerValidation, LogInValidation} = require('../validation');
const hashPassword = require('bcryptjs');
const JWT = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  //request body validation
  const {error} = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the user in the database
  const emailExist = await User.findOne({email: req.body.email});
  if (emailExist) return res.status(400).send('Email already exists');

  // hash the password before store it to the database
  const salt = await hashPassword.genSalt(10);
  const hashed = await hashPassword.hash(req.body.password, salt);

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashed
  });

  try {
    const savedUser = await newUser.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  // request body validation
  const {error} = LogInValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if user exist in database
  const user = await User.findOne({email: req.body.email});
  if (!user) return res.status(400).send('User is not found');

  //hash the password
  const validPassword = await hashPassword.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Password do not match');

  //Token
  const token = JWT.sign({id: user._id, name: user.name}, process.env.token_salt, {
    expiresIn: 60 * 5
  });
  res.cookie('auth_token', token, {httpOnly: true}).send('Saved');
});

module.exports = router;
