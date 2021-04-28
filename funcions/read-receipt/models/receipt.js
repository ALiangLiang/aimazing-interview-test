const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Receipt extends Model {
    static associate(models) {
      Receipt.belongsToMany(models.Product, { through: models.ReceiptProduct })
      Receipt.belongsTo(models.Store)
      Receipt.belongsTo(models.Tag)
    }
  };
  Receipt.init({
    idOnReceipt: DataTypes.INTEGER,
    tradeTime: DataTypes.DATE,
    payWay: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Receipt',
  });
  return Receipt;
};