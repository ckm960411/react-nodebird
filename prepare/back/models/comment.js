module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4', // 'utf8': 한글, 'utf8mb4': 한글+이모티콘
    collate: 'utf8mb4_general_ci',
  })
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User) // 하나의 Comment 는 User 에 속함
    db.Comment.belongsTo(db.Post) // 하나의 Comment 는 Post 에 속함
  }
  return Comment
}
