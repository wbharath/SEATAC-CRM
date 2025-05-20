// backend/models/User.js
const mongoose = require('mongoose')

const stepSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  data: { type: mongoose.Schema.Types.Mixed, default: {} },
  status: {
    type: String,
    enum: ['pending', 'submitted', 'approved', 'rejected'],
    default: 'pending'
  },
  updatedAt: { type: Date, default: Date.now }
})

const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true },
  name: String,
  email: { type: String, unique: true },
  photo: String,
  role: { type: String, enum: ['client', 'admin'], default: 'client' },
  allowedStep: { type: Number, default: 1 },
  onboarding: { type: [stepSchema], default: [] },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', userSchema)
