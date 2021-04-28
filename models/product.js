const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsToMany(models.Receipt, { through: models.ReceiptProduct });
    }
  };
  Product.init({
    ean: DataTypes.STRING,
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};