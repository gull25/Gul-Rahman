const app = require('../src/app')
const connectDB = require('../src/config/db')

// Connect to MongoDB before handling the request
connectDB()

module.exports = app
