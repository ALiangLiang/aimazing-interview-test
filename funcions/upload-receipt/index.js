const multiplartParser = require('lambda-multipart-parser')
const Parser1 = require('./receipt-parser/parser-1')
const { sequelize, Receipt, Store, Product, ReceiptProduct, Tag } = require('./models')

exports.handler = async (event) => {
  const receiptsData = []
  
  const result = await multiplartParser.parse(event);

  for (const file of result.files) {
    const receiptContent = file.content.toString('utf8')
    
    const data = new Parser1(receiptContent).parse()
    receiptsData.push(data)

    const t = await sequelize.transaction()
    try {
      const [store, ] = await Store.findOrCreate({
        where: {
          gstRegNo: data.gstRegNo
        },
        defaults: {
          name: data.storeName,
          tel: data.tel,
          gstRegNo: data.gstRegNo,
        },
        transaction: t
      })
      const [tag, ] = await Tag.findOrCreate({
        where: {
          name: result.tag
        },
        defaults: {
          name: result.tag
        },
        transaction: t
      })

      const receipt = await Receipt.create({
        payWay: data.payWay,
        tradeTime: data.tradeTime,
        idOnReceipt: data.idOnReceipt,
        StoreId: store.get('id'),
        TagId: tag.get('id'),
      }, { transaction: t })

      const productPromises = data.products.map((prod) => Product.findOrCreate({
        where: {
          ean: prod.ean,
        },
        defaults: {
          ean: prod.ean,
          name: prod.name,
        },
        transaction: t
      }))
      const products = (await Promise.all(productPromises)).map((pair) => pair[0])
      await ReceiptProduct.bulkCreate(products.map((prod) => ({
        quantity: prod.get('quantity'),
        unitPrice: prod.get('unitPrice'),
        ReceiptId: receipt.get('id'),
        ProductId: prod.get('id'),
      })), { transaction: t })
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ 'status': 'success' }),
  }
};