// backend/models/Step.js
const mongoose = require('mongoose')

const stepSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  number: { type: Number, required: true },
  data: { type: mongoose.Schema.Types.Mixed, default: {} },
  status: {
    type: String,
    enum: ['pending', 'submitted', 'approved', 'rejected'],
    default: 'pending'
  },
  updatedAt: { type: Date, default: Date.now }
})

stepSchema.index({ client: 1, number: 1 }, { unique: true })

module.exports = mongoose.model('Step', stepSchema)
