const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ReceiptProduct extends Model {
    static associate(models) {
    }
  };
  ReceiptProduct.init({
    quantity: DataTypes.INTEGER,
    unitPrice: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'ReceiptProduct',
  });
  return ReceiptProduct;
};