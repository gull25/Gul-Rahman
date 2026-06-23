// src/controllers/blogController.js
const Blog = require('../models/Blog')

// ── @desc   Get all published blog posts
// ── @route  GET /api/blog
// ── @access Public
async function getPosts(req, res, next) {
  try {
    const { category, featured, search } = req.query

    const filter = { published: true }

    if (category && category !== 'All') {
      filter.category = category
    }
    if (featured === 'true') {
      filter.featured = true
    }
    if (search) {
      filter.$or = [
        { title:   { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { tags:    { $in: [new RegExp(search, 'i')] } },
      ]
    }

    const posts = await Blog.find(filter)
      .sort({ featured: -1, createdAt: -1 })
      .select('-content') // Don't send full content in list view

    res.status(200).json({
      success: true,
      count:   posts.length,
      data:    posts,
    })
  } catch (error) {
    next(error)
  }
}

// ── @desc   Get single post by slug
// ── @route  GET /api/blog/:slug
// ── @access Public
async function getPostBySlug(req, res, next) {
  try {
    const post = await Blog.findOneAndUpdate(
      { slug: req.params.slug, published: true },
      { $inc: { views: 1 } },  // increment view count
      { new: true }
    )

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found.',
      })
    }

    res.status(200).json({
      success: true,
      data:    post,
    })
  } catch (error) {
    next(error)
  }
}

// ── @desc   Create a blog post (admin)
// ── @route  POST /api/blog
// ── @access Private
async function createPost(req, res, next) {
  try {
    const post = await Blog.create(req.body)
    res.status(201).json({
      success: true,
      message: 'Post created successfully.',
      data:    post,
    })
  } catch (error) {
    next(error)
  }
}

// ── @desc   Update a blog post (admin)
// ── @route  PUT /api/blog/:id
// ── @access Private
async function updatePost(req, res, next) {
  try {
    const post = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found.',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Post updated.',
      data:    post,
    })
  } catch (error) {
    next(error)
  }
}

// ── @desc   Delete a blog post (admin)
// ── @route  DELETE /api/blog/:id
// ── @access Private
async function deletePost(req, res, next) {
  try {
    const post = await Blog.findByIdAndDelete(req.params.id)

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found.',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Post deleted.',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
}