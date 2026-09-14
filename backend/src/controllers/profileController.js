const Profile = require('../models/Profile')

// @desc    Get profile
// @route   GET /api/profile
// @access  Public
const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne()
    if (!profile) {
      profile = await Profile.create({})
    }
    res.status(200).json(profile)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch profile' })
  }
}

// @desc    Update avatar
// @route   PUT /api/profile/avatar
// @access  Private (Admin)
const updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' })
    }

    const avatarUrl = req.file.path // Cloudinary URL

    let profile = await Profile.findOne()
    if (!profile) {
      profile = new Profile({ avatarUrl })
    } else {
      profile.avatarUrl = avatarUrl
    }

    await profile.save()

    res.status(200).json(profile)
  } catch (error) {
    res.status(500).json({ message: 'Failed to update avatar' })
  }
}

module.exports = {
  getProfile,
  updateAvatar,
}
