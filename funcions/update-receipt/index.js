const { sequelize, Receipt, Tag } = require('./models')

exports.handler = async (event) => {
  const body = (event.body) ? JSON.parse(event.body) : {}
  const targetId = body.id
  const updateTag = body.tag

  if (!updateTag || !targetId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ 'status': 'failed' }),
    }
  }

  const [tag, ] = await Tag.findOrCreate({
    where: {
      name: updateTag,
    }
  })
  
  await Receipt.update({
    TagId: tag.get('id'),
  }, {
    where: {
      id: targetId,
    }
  })

  return {
    statusCode: 200,
    body: JSON.stringify({ 'status': 'success' }),
  }
};