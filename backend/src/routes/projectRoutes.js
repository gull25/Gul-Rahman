// src/routes/projectRoutes.js
const express = require('express')
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController')
const { protect } = require('../middleware/authMiddleware')
const upload = require('../middleware/uploadMiddleware')

const router = express.Router()

router.get('/',     getProjects)      // GET  /api/projects
router.get('/:id',  getProjectById)   // GET  /api/projects/:id
router.post('/',    protect, upload.single('image'), createProject)    // POST /api/projects
router.put('/:id',  protect, upload.single('image'), updateProject)    // PUT  /api/projects/:id
router.delete('/:id', protect, deleteProject)  // DELETE /api/projects/:id

module.exports = router