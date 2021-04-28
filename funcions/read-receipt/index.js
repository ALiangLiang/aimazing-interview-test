const { sequelize, Receipt, Store, Product, Tag } = require('./models')

exports.handler = async (event) => {
  const queryTag = (event.queryStringParameters || {}).tag
  console.log(queryTag)

  let receipts = []
  if (!queryTag) {
    receipts = await Receipt.findAll({
      include: [Store, Product, Tag]
    })
  } else {
    const tag = await Tag.findOne({
      where: {
        name: queryTag,
      }
    })

    if (!tag) {
      return {
        statusCode: 404,
        body: JSON.stringify({ 'status': 'failed' }),
      }
    }

    if (tag) {
      receipts = await Receipt.findAll({
        where: {
          TagId: tag.get('id')
        },
        include: [Store, Product, Tag]
      })
    }
  }

  const receiptsData = receipts.map((r) => r.toJSON())

  return {
    statusCode: 200,
    body: JSON.stringify({
      status: 'success',
      receipts: receiptsData
    }),
  }
};