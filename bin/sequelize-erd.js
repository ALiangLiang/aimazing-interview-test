const {writeFileSync} = require('fs');
const sequelizeErd = require('sequelize-erd');
const { sequelize } = require('../models');

(async function(){
  const svg = await sequelizeErd({ source: sequelize }); // sequelizeErd() returns a Promise
  writeFileSync('./erd.svg', svg);
})();