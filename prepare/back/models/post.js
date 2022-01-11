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
  Post.associate = (db) => {}
  return Post
}
