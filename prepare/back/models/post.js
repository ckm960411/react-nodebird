module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    content: {
      type: DataTypes.TEXT, // 문자열수 제한이 없음
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4', // 'utf8': 한글, 'utf8mb4': 한글+이모티콘
    collate: 'utf8mb4_general_ci',
  })
  Post.associate = (db) => {
    db.Post.belongsTo(db.User) // 하나의 Post 는 User 에 속함
    db.Post.belongsToMany(db.Hashtag) // Post 와 Hashtag 는 '다대다 관계'
    db.Post.hasMany(db.Comment) // 하나의 Post 에 여러 Comment
    db.Post.hasMany(db.Image) // 하나의 Post 에 여러 Image
    db.Post.belongsTo(db.Post, { as: 'RetweetId' })
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }) // Post 와 좋아요를 한 User 는 다대다 관계
  }
  return Post
}
