// backend/models/Client.js
const { Schema, model } = require('mongoose')

const stepSchema = new Schema({
  number: { type: Number, required: true },
  data: { type: Schema.Types.Mixed, default: {} },
  status: {
    type: String,
    enum: ['pending', 'submitted', 'approved', 'rejected'],
    default: 'pending'
  },
  updatedAt: { type: Date, default: Date.now }
})

const clientSchema = new Schema({
  googleId: { type: String, unique: true },
  name: String,
  email: String,
  photo: String,
  role: { type: String, enum: ['client', 'admin'], default: 'client' },
  onboarding: [stepSchema], // one entry per step
  createdAt: { type: Date, default: Date.now }
})

module.exports = model('Client', clientSchema)
