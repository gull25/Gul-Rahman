// src/routes/projectRoutes.js
const express = require('express')
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController')

const router = express.Router()

router.get('/',     getProjects)      // GET  /api/projects
router.get('/:id',  getProjectById)   // GET  /api/projects/:id
router.post('/',    createProject)    // POST /api/projects
router.put('/:id',  updateProject)    // PUT  /api/projects/:id
router.delete('/:id', deleteProject)  // DELETE /api/projects/:id

module.exports = router