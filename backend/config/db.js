// backend/config/db.js
const mongoose = require('mongoose')

const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/seatac_crm'
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err))

module.exports = mongoose
