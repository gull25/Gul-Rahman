const express = require('express')
const router = express.Router()
const { getProfile, updateAvatar } = require('../controllers/profileController')
const upload = require('../middleware/uploadMiddleware')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(getProfile)
router.route('/avatar').put(protect, upload.single('image'), updateAvatar)

module.exports = router
