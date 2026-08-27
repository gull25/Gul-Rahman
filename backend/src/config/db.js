// src/config/db.js
const mongoose = require('mongoose')

let isConnected = false

async function connectDB() {
  if (isConnected) {
    return
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    isConnected = true
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`)
    // In a serverless environment, we do not want to exit the process
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1)
    }
  }
}

module.exports = connectDB