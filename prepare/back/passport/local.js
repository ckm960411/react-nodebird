const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const bcrypt = require('bcrypt')
const { User } = require('../models')

module.exports = () => {
  passport.use(new LocalStrategy({ // local 로그인 전략
    // 1) req.body 에 대한 설정
    usernameField: 'email', // req.body.email
    passwordField: 'password', // req.body.password
  }, async (email, password, done) => {
    // 2) 여기서 로그인에 대한 전략을 세움
    try {
      const user = await User.findOne({
        where: { email }
      })
      if (!user) {
        return done(null, false, { reason: '존재하지 않는 이메일입니다!' })
        // 첫번째 인자 서버에러, 두번째 자리 성공, 세번쨰 인자 클라이언트에러
      }
      const result = await bcrypt.compare(password, user.password)
      if (result) {
        return done(null, user) // 성공에다가 사용자 정보를 넘겨줌
      }
      return done(null, false, { reason: '비밀번호가 틀렸습니다.' })
    } catch(error) {
      console.error(error)
      return done(error)
    }
  }))
}