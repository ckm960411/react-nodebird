const express = require('express')
const bcrypt = require('bcrypt')
const { User } = require('../models/user') // 원래는 db.User 로 꺼내지만 구조분해 할당함

const router = express.Router()

router.post('/', async (req, res) => { // POST /user
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
    res.send('회원가입 완료!')
  } catch (error) {
    console.error(error)
    next(error) 
  }
})

module.exports = router