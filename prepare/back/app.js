const express = require('express')
const cors = require('cors')

const postRouter = require('./routes/post')
const userRouter = require('./routes/user')
const db = require('./models')
const app = express()

db.sequelize.sync()
  .then(() => console.log('db 연결 성공'))
  .catch(console.error)

// 프론트에서 보낸 정보를 라우터에서 해석할 수 있게끔 해줌
app.use(cors({
  origin: true, // res.setHeader('Access-Control-Origin-Allow', '*')
  credentials: false, // 나중에 true 로 바꾸어야 함
})) 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('hello express')
})

app.use('/user', userRouter)
app.use('/post', postRouter)

app.listen(3065, () => {
  console.log('서버 실행 중')
})
