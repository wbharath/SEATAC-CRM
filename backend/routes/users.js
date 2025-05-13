// backend/routes/users.js
const express = require('express')
const User = require('../models/User')
const router = express.Router()

// (Protect this route so only admins can use it!)
router.get('/', async (req, res) => {
  try {
    const all = await User.find().select('-__v')
    res.json(all)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
