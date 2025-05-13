// backend/routes/auth.js
const express = require('express')
const passport = require('passport')
const router = express.Router()
const Step = require('../models/Step')

// kick off Google OAuth
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

// Google OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  async (req, res) => {
    try {
      // Seed 7 step documents if none exist for this user
      const existing = await Step.countDocuments({ client: req.user._id })
      if (existing === 0) {
        const seeds = Array.from({ length: 7 }, (_, i) => ({
          client: req.user._id,
          number: i + 1,
          data: {},
          status: 'pending',
          updatedAt: new Date(),
          kind: `step${i + 1}` // if you’re using discriminators
        }))
        await Step.insertMany(seeds)
      }
    } catch (err) {
      console.error('Error seeding steps on login:', err)
      // proceed anyway
    }

    // Redirect into your client home with a login flag
    res.redirect('http://localhost:5173/homeclient?login=success')
  }
)

router.get('/failure', (req, res) => res.send('Google login failed'))

// return logged-in user
router.get('/user', (req, res) => {
  res.json(req.user || null)
})

// logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('http://localhost:3000')
  })
})

module.exports = router
