module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define('Hashtag', {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4', // 'utf8': 한글, 'utf8mb4': 한글+이모티콘
    collate: 'utf8mb4_general_ci',
  })
  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag'}) // Hashtag 와 Post 는 '다대다 관계'
  }
  return Hashtag
}
