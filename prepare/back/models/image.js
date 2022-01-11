module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    src: {
      type: DataTypes.STRING(200), // 이미지는 url이라 넉넉하게
      allowNull: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  })
  Image.associate = (db) => {
    db.Image.belongsTo(db.Post) // 하나의 Image 는 하나의 Post 에 속함
  }
  return Image
}
