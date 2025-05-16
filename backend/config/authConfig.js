require('dotenv').config()

module.exports = {
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/google/callback',
    adminCallbackURL: 'http://localhost:5000/auth/google/admin/callback'
  }
}
