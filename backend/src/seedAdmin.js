require('dotenv').config()
const connectDB = require('./config/db')
const Admin = require('./models/Admin')

async function seedAdmin() {
  try {
    await connectDB()
    console.log('🌱 Seeding Admin...')

    const email = process.env.ADMIN_EMAIL || 'admin@example.com'
    const password = process.env.ADMIN_PASSWORD || 'password123'

    const existingAdmin = await Admin.findOne({ email })
    
    if (existingAdmin) {
      console.log('Admin already exists!')
      process.exit(0)
    }

    await Admin.create({ email, password })
    console.log(`✅ Admin created with email: ${email} and password: ${password}`)
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  }
}

seedAdmin()
