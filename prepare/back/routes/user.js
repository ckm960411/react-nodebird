const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')
const { User, Post } = require('../models') // 원래는 db.User 로 꺼내지만 구조분해 할당함
const db = require('../models')
const { isLoggedIn, isNotLoggedIn } = require('./middlewares')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      // req.user 가 있으면 user 를 가져옴
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password']
        },
        include: [
          { model: Post, attributes: ['id'] },
          { model: User, as: 'Followings', attributes: ['id'] },
          { model: User, as: 'Followers', attributes: ['id'] }
        ]
      })
      res.status(200).json(fullUserWithoutPassword)
    } else {
      // req.user 가 없으면 그냥 아무것도 안함
      res.status(200).json(null)
    }
  } catch(error) {
    console.error(error)
    next(error)
  }
})

router.post('/login', isNotLoggedIn, (req, res, next) => {  // POST /user/login
  passport.authenticate('local', (error, user, info) => {
    // 서버 에러가 나는 경우
    if (error) {
      console.error(error)
      return next(error)
    }
    // 클라이언트 에러가 나는 경우
    if (info) { // info 는 클라이언트 에러가 났을 때 보내주는 reason 객체
      return res.status(401).send(info.reason)
    }
    // 성공한 경우
    return req.login(user, async (loginError) => {
      if (loginError) { // passport 에서 로그인에러가 날 경우 핸들링
        console.error(error)
        next(loginError)
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password']
        },
        include: [
          { model: Post },
          { model: User, as: 'Followings' },
          { model: User, as: 'Followers' }
        ]
      })
      return res.status(200).json(fullUserWithoutPassword)
    })
  })(req, res, next)
}) 

router.post('/logout', isLoggedIn, (req, res, next) => {
  req.logout()
  req.session.destroy()
  res.status(200).send('로그아웃 성공!')
})

router.post('/', isNotLoggedIn, async (req, res, next) => { // POST /user
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      }
    })
    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다.')
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    })
    res.status(201).send('회원가입 완료!')
  } catch (error) {
    console.error(error)
    next(error) // status 500
  }
})

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    User.update(
      { nickname: req.body.nickname }, // 프론트에서 제공한 닉네임으로 수정
      { where: { id: req.user.id }},
    )
    res.status(200).json({ nickname: req.body.nickname })
  } catch(error) {
    console.error(error)
    next(error)
  }
})

// PATCH /user/(params)/follow
router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId }})
    if (!user) {
      res.status(403).send('존재하지 않는 사용자입니다.')
    }
    await user.addFollowers(req.user.id) // 나를 팔로워로 추가
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) })
  } catch(error) {
    console.error(error)
    next(error)
  }
})

// DELETE /user/(params)/follow
router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId }})
    if (!user) {
      res.status(403).send('존재하지 않는 사용자입니다.')
    }
    await user.removeFollowers(req.user.id) // 나를 팔로워에서 제거
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) })
  } catch(error) {
    console.error(error)
    next(error)
  }
})

// GET /user/followers
router.get('/followers', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id }})
    if (!user) {
      res.status(403).send('존재하지 않는 사용자입니다.')
    }
    const followers = await user.getFollowers() // 나의 팔로워 찾기
    res.status(200).json(followers)
  } catch(error) {
    console.error(error)
    next(error)
  }
})

// GET /user/followings
router.get('/followings', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id }})
    if (!user) {
      res.status(403).send('존재하지 않는 사용자입니다.')
    }
    const followings = await user.getFollowings() // 내가 팔로잉하는 사용자들 찾기
    res.status(200).json(followings)
  } catch(error) {
    console.error(error)
    next(error)
  }
})

// DELETE /user/follower/(params)
router.delete('/follower/:userId', isLoggedIn, async (req, res, next) => {
  try {
    // 그 사람의 팔로잉에서 날 끊기
    const user = await User.findOne({ where: { id: req.params.userId } })
    if (!user) {
      res.status(403).send('존재하지 않는 사용자입니다.')
    }
    await user.removeFollowings(req.user.id)
    /** 내 팔로워에서 그 사람 끊기
      const user = await User.findOne({ where: { id: req.user.id } })
      if (!user) {
        res.status(403).send('존재하지 않는 사용자입니다.')
      }
      await user.removeFollowers(req.params.userId)
    */
    
    res.status(200).json({ UserId: parseInt(req.params.userId, 10)})
  } catch(error) {
    console.error(error)
    next(error)
  }
})

module.exports = router