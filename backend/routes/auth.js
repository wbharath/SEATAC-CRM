// backend/routes/auth.js
const express = require('express')
const passport = require('passport')
const router = express.Router()
const Step = require('../models/Step')

// 1) Kick off OAuth, stash role in session via `state`
router.get('/google', (req, res, next) => {
  // Default to "client", unless ?role=admin is present
  const role = req.query.role === 'admin' ? 'admin' : 'client'
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    state: role
  })(req, res, next)
})

// 2) Single callback for both flows
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  async (req, res) => {
    // 2a) For clients: seed 7 onboarding steps if new
    if (req.query.state === 'client') {
      try {
        const count = await Step.countDocuments({ client: req.user._id })
        if (count === 0) {
          const seeds = Array.from({ length: 7 }, (_, i) => ({
            client: req.user._id,
            number: i + 1,
            data: {},
            status: 'pending',
            updatedAt: new Date()
          }))
          await Step.insertMany(seeds)
        }
      } catch (err) {
        console.error('Seeding steps error:', err)
      }
    }

    // 2b) If state=admin, elevate and save
    if (req.query.state === 'admin') {
      req.user.role = 'admin'
      await req.user.save()
      return res.redirect('http://localhost:5173/admindashboard?login=success')
    }

    // 2c) Otherwise it’s a normal client
    return res.redirect('http://localhost:5173/homeclient?login=success')
  }
)

router.get('/failure', (req, res) => res.send('Google login failed'))

// return current user or null
router.get('/user', (req, res) => res.json(req.user || null))

// logout → back to sign-in
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('http://localhost:5173/login')
  })
})

module.exports = router
