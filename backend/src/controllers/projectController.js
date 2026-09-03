// src/controllers/projectController.js
const Project = require('../models/Project')

// ── @desc   Get all published projects
// ── @route  GET /api/projects
// ── @access Public
async function getProjects(req, res, next) {
  try {
    const { category, featured } = req.query

    // Build filter
    const filter = { status: 'Published' }
    if (category && category !== 'all') {
      filter.category = category
    }
    if (featured === 'true') {
      filter.featured = true
    }

    const projects = await Project.find(filter)
      .sort({ featured: -1, order: 1, createdAt: -1 })

    res.status(200).json({
      success: true,
      count:   projects.length,
      data:    projects,
    })
  } catch (error) {
    next(error)
  }
}

// ── @desc   Get single project by ID
// ── @route  GET /api/projects/:id
// ── @access Public
async function getProjectById(req, res, next) {
  try {
    const project = await Project.findById(req.params.id)

    if (!project || project.status !== 'Published') {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      })
    }

    res.status(200).json({
      success: true,
      data:    project,
    })
  } catch (error) {
    next(error)
  }
}

// ── @desc   Create a project (admin)
// ── @route  POST /api/projects
// ── @access Private
async function createProject(req, res, next) {
  try {
    const projectData = { ...req.body }
    
    // Parse features if sent as JSON string
    if (projectData.features && typeof projectData.features === 'string') {
      try {
        projectData.features = JSON.parse(projectData.features)
      } catch (e) {
        // If it fails, assume it's comma separated or just a string
        projectData.features = projectData.features.split(',').map(s => s.trim())
      }
    }

    // Parse tags if sent as JSON string
    if (projectData.tags && typeof projectData.tags === 'string') {
      try {
        projectData.tags = JSON.parse(projectData.tags)
      } catch (e) {
        projectData.tags = projectData.tags.split(',').map(s => s.trim())
      }
    }

    if (req.file) {
      projectData.image = req.file.path
    }

    const project = await Project.create(projectData)
    res.status(201).json({
      success: true,
      message: 'Project created successfully.',
      data:    project,
    })
  } catch (error) {
    next(error)
  }
}

// ── @desc   Update a project (admin)
// ── @route  PUT /api/projects/:id
// ── @access Private
async function updateProject(req, res, next) {
  try {
    const projectData = { ...req.body }
    
    // Parse features if sent as JSON string
    if (projectData.features && typeof projectData.features === 'string') {
      try {
        projectData.features = JSON.parse(projectData.features)
      } catch (e) {
        projectData.features = projectData.features.split(',').map(s => s.trim())
      }
    }

    // Parse tags if sent as JSON string
    if (projectData.tags && typeof projectData.tags === 'string') {
      try {
        projectData.tags = JSON.parse(projectData.tags)
      } catch (e) {
        projectData.tags = projectData.tags.split(',').map(s => s.trim())
      }
    }

    if (req.file) {
      projectData.image = req.file.path
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      projectData,
      { new: true, runValidators: true }
    )

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Project updated successfully.',
      data:    project,
    })
  } catch (error) {
    next(error)
  }
}

// ── @desc   Delete a project (admin)
// ── @route  DELETE /api/projects/:id
// ── @access Private
async function deleteProject(req, res, next) {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully.',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
}