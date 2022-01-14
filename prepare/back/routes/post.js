const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { Post, User, Image, Comment } = require('../models')
const { isLoggedIn } = require('./middlewares')

const router = express.Router()

try {
  fs.accessSync('uploads')
} catch(error) {
  console.log('uploads 폴더가 없으므로 생성합니다.')
  fs.mkdirSync('uploads')
}

// multer 는 폼마다 형식이 달라서 라우터마다 별도의 세팅을 해줌
const upload = multer({
  storage: multer.diskStorage({ // storage: 어디에 저장할지, 일단 컴퓨터 하드디스크
    destination(req, res, done) {
      done(null, 'uploads') // 'uploads' 라는 폴더에 저장
    },
    filename(req, file, done) { // 경민복.png
      const ext = path.extname(file.originalname) // 확장자 추출(ex .png)
      const basename = path.basename(file.originalname, ext) // 이름 추출(ex '경민복')
      done(null, basename + '_' + new Date().getTime() + ext) // ex 경민복123123123.png
    }
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB 로 사이즈 제한
})
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => { // POST /post
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id
    })
    if (req.body.image) {
      if (Array.isArray(req.body.image)) { 
        // 이미지를 여러개 올리면 image: [경민복.png, 괄돈복.png]
        const images = await Promise.all(req.body.image.map(image => Image.create({ src: image })))
        await post.addImages(images)
        // -> DB에는 파일 주소만 가짐
      } else { 
        // 이미지를 하나만 올리면 image: 경민복.png
        const image = await Image.create({ src: req.body.image })
        await post.addImages(image)
      }
    }
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

// POST /post/images
router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => {
  try {
    console.log(req.files)
    res.json(req.files.map(v => v.filename))
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

router.patch('/:postId/like', isLoggedIn, async (req, res, next) => { // PATCH /post/(params)/like
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

router.delete('/:postId/like', isLoggedIn, async (req, res, next) => { // DELETE /post/(params)/unlike
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

router.delete('/:postId', isLoggedIn, async (req, res, next) => { // DELETE /post
  try {
    await Post.destroy({
      where: { 
        id: req.params.postId, // 게시글 id 와 일치하는지 확인
        UserId: req.user.id, // 오직 본인만 삭제할 수 있도록 한번 더 검증
      }
    })
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) })
  } catch(error) {
    console.error(error)
    next(error)
  }
})

module.exports = router