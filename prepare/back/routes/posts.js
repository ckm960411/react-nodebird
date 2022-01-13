const express = require('express')
const { Post, User, Image, Comment } = require('../models')

const router = express.Router()

router.get('/', async (req, res, next) => { // GET /posts
  try {
    const posts = await Post.findAll({
      limit: 10, // 10개씩 로드
      order: [['createdAt', 'DESC'], [Comment, 'createdAt', 'DESC']], // 최신순(=내림차순, DESC) <-> 작성순(오름차순, ASC)
      include: [
        { model: User, attributes: ['id', 'nickname'] },
        { model: Image },
        { model: Comment, include: [
          { model: User, attributes: ['id', 'nickname'] }
        ] },
      ]
    })
    res.status(200).json(posts)
  } catch(error) {
    console.error(error)
    next(error)
  }
})

module.exports = router