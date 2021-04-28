const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    static associate(models) {
      Store.hasMany(models.Receipt)
    }
  };
  Store.init({
    name: DataTypes.STRING,
    tel: DataTypes.STRING,
    gstRegNo: {
      type: DataTypes.STRING,
      unique: true,
    },
  }, {
    sequelize,
    modelName: 'Store',
  });
  return Store;
};