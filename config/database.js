const { Sequelize } = require('sequelize');
let instance = null;

class Database {
  constructor() {
    if (!instance) {
      instance = new Sequelize('assignments', 'root', process.env.MYSQL_PASSWORD, {
        host: '127.0.0.1',
        dialect: 'mysql',
        logging: false,
      });
    }
    return instance;
  }
}

module.exports = new Database();