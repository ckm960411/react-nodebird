const express = require('express')
const { Op } = require('sequelize')
const { Post, User, Image, Comment } = require('../models')

const router = express.Router()

router.get('/', async (req, res, next) => { // GET /posts
  try {
    const where = {}
    if (parseInt(req.query.lastId, 10)) {
      // 초기 로딩이 아닐 때
      // 'lastId 보다 작은 걸로 10개를 불러와라' 으로 조건이 생성됨
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) }
    }
    const posts = await Post.findAll({
      where,
      limit: 10, // 10개씩 로드
      order: [['createdAt', 'DESC'], [Comment, 'createdAt', 'DESC']], // 최신순(=내림차순, DESC) <-> 작성순(오름차순, ASC)
      include: [
        { model: User, attributes: ['id', 'nickname'] },
        { model: Image },
        { model: Comment,
          include: [{ 
            model: User, 
            attributes: ['id', 'nickname'] 
          }] 
        },
        { model: User, // 좋아요 누른 사람
          as: 'Likers',
          attributes: ['id']
        },
        { model: Post,
          as: 'RetweetId',
          include: [
            { model: User, attributes: ['id', 'nickname'] },
            { model: Image }
          ]
        },
      ]
    })
    res.status(200).json(posts)
  } catch(error) {
    console.error(error)
    next(error)
  }
})

module.exports = router