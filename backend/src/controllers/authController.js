const Admin = require('../models/Admin')
const jwt = require('jsonwebtoken')

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d',
  })
}

// ── @desc   Auth admin & get token
// ── @route  POST /api/auth/login
// ── @access Public
async function loginAdmin(req, res, next) {
  try {
    const { email, password } = req.body

    const admin = await Admin.findOne({ email })

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        success: true,
        data: {
          _id: admin._id,
          email: admin.email,
          token: generateToken(admin._id),
        },
      })
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  loginAdmin,
}
