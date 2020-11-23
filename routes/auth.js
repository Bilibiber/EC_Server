const router = require('express').Router()
const User = require('../model/userModel')
const {registerValidation} = require('../validation')

router.post('/register', async (req, res) => {
  //Joi validation
  const {error} = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // check if the user in the database
  const emailExist = await User.findOne({email: req.body.email})
  if (emailExist) return res.status(400).send('Email already exists')

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })

  try {
    const savedUser = await newUser.save()
    res.send(savedUser)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.post('/login', (req, res) => {
  res.send('login')
})

module.exports = router
