require('dotenv').config()
const mongoose = require('mongoose')
const Project = require('./src/models/Project')

async function checkDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to DB')
    const count = await Project.countDocuments()
    console.log(`There are currently ${count} projects in the database.`)
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
checkDB()
