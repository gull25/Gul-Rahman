// src/routes/blogRoutes.js
const express = require('express')
const {
  getPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/blogController')

const router = express.Router()

router.get('/',       getPosts)        // GET    /api/blog
router.get('/:slug',  getPostBySlug)   // GET    /api/blog/:slug
router.post('/',      createPost)      // POST   /api/blog
router.put('/:id',    updatePost)      // PUT    /api/blog/:id
router.delete('/:id', deletePost)      // DELETE /api/blog/:id

module.exports = router