const express = require('express')
const { Post, User, Image, Comment } = require('../models')
const { isLoggedIn } = require('./middlewares')

const router = express.Router()

router.post('/', isLoggedIn, async (req, res, next) => { // POST /post
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id
    })
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        { model: Image }, // 게시글에 달린 이미지
        { model: Comment, 
          include: [
            { model: User,  // 댓글 작성자
              attrbitues: ['id', 'nickname']
            }
          ] 
        },
        { model: User, attrbitues: ['id', 'nickname'] }, // 게시글 작성자
        { model: User, // 좋아요 누른 사람
          as: 'Likers', 
          attributes: ['id'] 
        },
      ]
    })
    res.status(201).json(fullPost)
  } catch(error) {
    console.error(error)
    next(error)
  }
})

// POST /post/1/comment
router.post('/:postId/comment', isLoggedIn, async (req, res, next) => { 
  try {
    // 현재 params 로 받은 postId 의 post 가 실제로 있는지 확인
    const post = await Post.findOne({
      where: { id: req.params.postId }
    })
    // 존재하지 않는 post 에 댓글을 달려는 경우 리턴시킴
    if (!post) {
      return res.status(403).send('존재하지 않는 게시물입니다.')
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id
    })
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        { model: User, attrbitues: ['id', 'nickname']}
      ]
    })
    res.status(201).json(fullComment)
  } catch(error) {
    console.error(error)
    next(error)
  }
})

router.patch('/:postId/like', async (req, res, next) => { // PATCH /post/(params)/like
  try {
    const post = await Post.findOne({ where: { id: req.params.postId }})
    if (!post) { // Post 가 없는데 좋아요할 것도 없음
      return res.status(403).send('게시글이 존재하지 않습니다.')
    }
    await post.addLikers(req.user.id)
    res.status(200).json({ PostId: post.id, UserId: req.user.id })
  } catch(error) {
    console.error(error)
    next(error)
  }
})

router.delete('/:postId/like', async (req, res, next) => { // DELETE /post/(params)/unlike
  try {
    const post = await Post.findOne({ where: { id: req.params.postId }})
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.')
    }
    await post.removeLikers(req.user.id)
    res.status(200).json({ PostId: post.id, UserId: req.user.id })
  } catch(error) {
    console.error(error)
    next(error)
  }
})

router.delete('/', (req, res) => { // DELETE /post
  res.json({ id: 1 })
})

module.exports = router