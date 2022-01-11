module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', { // MySQL에는 users 테이블 생성
    // 여기에 엑셀을 만든다고 생각하면 됨
    // 사용자 정보, id 는 기본적으로 들어있음
    email: { // 각각의 column 의 정보들, 각 col 에 실제 들어오는 데이터는 row
      type: DataTypes.STRING(30), // 문자열 & 20자 이내
      // STRING(문자열), TEXT(긴글), BOOLEAN, INTEGER(정수), FLOAT(소수), DATETIME(시간) 등
      allowNull: false, // 필수로 입력, true 면 선택
      unique: true, // 고유한 값(중복 방지)
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false, // 닉네임 필수
    },
    password: {
      type: DataTypes.STRING(100), // 비밀번호는 암호화하면 길이가 길어지기 때문에 길게
      allowNull: false,
    },
  }, {
    // User 모델에 대한 세팅
    charset: 'utf8', // 한글을 쓸 수 있음
    collate: 'utf8_general_ci', // 한글 저장
  })
  User.associate = (db) => {
    db.User.hasMany(db.Post) // 하나의 User 에 여러 Post 가능
    db.User.hasMany(db.Comment) // 하나의 User 에 여러 Comment 가능
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' }) // 좋아요에 저장된 User 와 Post 는 다대다 관계
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' })
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' })
  }
  return User
}
