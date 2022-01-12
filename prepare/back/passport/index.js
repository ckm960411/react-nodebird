const passport = require('passport')
const local = require('./local')
const { User } = require('../models')

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id) // 유저 정보 중 쿠키에는 user.id 만 저장함
  });

  passport.deserializeUser( async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } })
      done(null, user) // id 를 가지고 user 정보를 복구함
    } catch(error) {
      console.error(error)
      done(error)
    }
  });

  local();
}
