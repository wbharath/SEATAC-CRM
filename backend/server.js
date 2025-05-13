// backend/server.js
require('dotenv').config()
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const cors = require('cors')

require('./config/db') // your MongoDB connection
const { google } = require('./config/authConfig')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users')
const clientsRouter = require('./routes/clients')

const app = express()

// CORS for Vite proxy origin
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
  })
)

// parse JSON bodies
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// session + passport
app.use(
  session({
    secret: 'seatac-secret',
    resave: false,
    saveUninitialized: false
  })
)
app.use(passport.initialize())
app.use(passport.session())

// Google OAuth setup
passport.use(
  new GoogleStrategy(
    {
      clientID: google.clientID,
      clientSecret: google.clientSecret,
      callbackURL: google.callbackURL
    },
    async (accessToken, refreshToken, profile, done) => {
      const User = require('./models/User')
      const filter = { googleId: profile.id }
      const update = {
        name: profile.displayName,
        email: profile.emails[0].value,
        photo: profile.photos[0].value
      }
      const opts = { upsert: true, new: true, setDefaultsOnInsert: true }
      const user = await User.findOneAndUpdate(filter, update, opts)
      done(null, user)
    }
  )
)
passport.serializeUser((u, done) => done(null, u.id))
passport.deserializeUser(async (id, done) => {
  const User = require('./models/User')
  const u = await User.findById(id)
  done(null, u)
})

// mount routes
app.use('/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/clients', clientsRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
)
