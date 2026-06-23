// server.js
require('dotenv').config()
const app       = require('./src/app')
const connectDB = require('./src/config/db')

const PORT = process.env.PORT || 5000

async function startServer() {
  // Connect to MongoDB first
  await connectDB()

  const server = app.listen(PORT, () => {
    console.log(`
🚀 Server running in ${process.env.NODE_ENV} mode
📡 Port     : ${PORT}
🌐 API URL  : http://localhost:${PORT}/api
❤️  Health   : http://localhost:${PORT}/api/health
    `)
  })

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Rejection:', err.message)
    server.close(() => process.exit(1))
  })
}

startServer()