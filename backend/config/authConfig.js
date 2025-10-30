require('dotenv').config()

// backend/config/authConfig.js
module.exports = {
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL_CLIENT,
    adminCallbackURL: process.env.GOOGLE_CALLBACK_URL_ADMIN
  }
}
