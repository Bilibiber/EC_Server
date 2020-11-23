const router = require('express').Router()

router.post('/register', (req, res) => {
  res.send('Register')
})

router.post('/login', (req, res) => {
  res.send('login')
})

module.exports = router
