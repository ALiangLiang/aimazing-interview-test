const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      Tag.hasMany(models.Receipt)
    }
  };
  Tag.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};