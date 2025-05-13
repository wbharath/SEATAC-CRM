// backend/routes/clients.js
const express = require('express')
const router = express.Router()
const Step = require('../models/Step')

// ensure 7 steps exist the first time
async function seedStepsFor(userId) {
  const existing = await Step.countDocuments({ client: userId })
  if (existing === 0) {
    const seeds = Array.from({ length: 7 }, (_, i) => ({
      client: userId,
      number: i + 1,
      data: {},
      status: 'pending',
      updatedAt: new Date()
    }))
    await Step.insertMany(seeds)
  }
}

// GET /api/clients/onboarding
router.get('/onboarding', async (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' })
  await seedStepsFor(req.user.id)
  const steps = await Step.find({ client: req.user.id }).sort('number')
  res.json(steps)
})

// PATCH /api/clients/step/:stepNum
router.patch('/step/:stepNum', async (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' })

  const stepNum = parseInt(req.params.stepNum, 10)
  // block only if a prior step was explicitly rejected
  const rejected = await Step.findOne({
    client: req.user.id,
    number: { $lt: stepNum },
    status: 'rejected'
  })
  if (rejected) {
    return res.status(403).json({ error: 'A previous step was rejected' })
  }

  // perform the update
  const updated = await Step.findOneAndUpdate(
    { client: req.user.id, number: stepNum },
    {
      $set: {
        data: req.body.data || {},
        status: 'submitted',
        updatedAt: new Date()
      }
    },
    { new: true, runValidators: true }
  )

  console.log('🔄 Updated Step:', updated) // should show your data object

  if (!updated) {
    return res.status(400).json({ error: 'Step not found' })
  }
  res.json(updated)
})

// POST /api/clients/step/:stepNum/approve
router.post('/step/:stepNum/approve', async (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' })

  const stepNum = parseInt(req.params.stepNum, 10)
  const updated = await Step.findOneAndUpdate(
    { client: req.user.id, number: stepNum },
    {
      $set: {
        status: req.body.approve ? 'approved' : 'rejected',
        updatedAt: new Date()
      }
    },
    { new: true }
  )
  if (!updated) {
    return res.status(400).json({ error: 'Step not found' })
  }
  res.json(updated)
})

module.exports = router
