// backend/routes/admin.js
const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Step = require('../models/Step')

// only admins may use these routes
router.use((req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' })
  }
  next()
})

// GET /api/admin/clients  → list all clients
router.get('/clients', async (req, res) => {
  const clients = await User.find({ role: 'client' }).select('name email')
  res.json(clients)
})

// GET /api/admin/clients/:id/steps  → list 7 steps for one client
router.get('/clients/:id/steps', async (req, res) => {
  const steps = await Step.find({ client: req.params.id }).sort('number')
  res.json(steps)
})

router.post('/clients/:id/allow/:stepNum', async (req, res) => {
  const { id, stepNum } = req.params
  const allowed = parseInt(stepNum, 10)
  if (!(allowed >= 1 && allowed <= 7)) {
    return res.status(400).json({ error: 'Invalid step number' })
  }
  const u = await User.findByIdAndUpdate(
    id,
    { allowedStep: allowed },
    { new: true }
  )
  if (!u) return res.status(404).json({ error: 'Client not found' })
  res.json({ allowedStep: u.allowedStep })
})

module.exports = router
