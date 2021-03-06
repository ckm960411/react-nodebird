const express = require('express')
const cors = require('cors')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const dotenv = require('dotenv')
const morgan = require('morgan')
const path = require('path')

const postRouter = require('./routes/post')
const userRouter = require('./routes/user')
const postsRouter = require('./routes/posts')
const db = require('./models')
const passportConfig = require('./passport')

dotenv.config()

const app = express()
db.sequelize.sync()
  .then(() => console.log('db 연결 성공'))
  .catch(console.error)

  passportConfig()

app.use(morgan('dev'))
app.use(cors({
  origin: true, // res.setHeader('Access-Control-Origin-Allow', '*')
  credentials: true, // cookie🍪를 다른 도메인간 넘겨주는 역할
})) 
app.use('/', express.static(path.join(__dirname, 'uploads')))
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // multipart 폼이 아닌 일반파트 폼을 보내는 양식
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET, // 쿠키에 랜덤한 문자를 보내줄 때 쿠키를 해석해주는 비밀 key
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
  res.send('hello express')
})

app.use('/posts', postsRouter)
app.use('/post', postRouter)
app.use('/user', userRouter)

app.listen(3065, () => {
  console.log('서버 실행 중')
})
