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
  Comment.associate = (db) => {}
  return Comment
}
