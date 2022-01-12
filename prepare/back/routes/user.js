const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')
const { User } = require('../models') // 원래는 db.User 로 꺼내지만 구조분해 할당함

const router = express.Router()

router.post('/login', (req, res, next) => {  // POST /user/login
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
      return res.status(200).json(user)
    })
  })(req, res, next)
}) 

router.post('/logout', (req, res, next) => {
  req.logout()
  req.session.destroy()
  res.status(200).send('로그아웃 성공!')
})

router.post('/', async (req, res, next) => { // POST /user
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

module.exports = router