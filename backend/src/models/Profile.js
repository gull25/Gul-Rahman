const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema(
  {
    avatarUrl: {
      type: String,
      default: '/avatar.png', // Fallback to static avatar if none is uploaded
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Profile', profileSchema)
