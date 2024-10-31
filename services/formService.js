const Database = require('../config/database');
const { createModel } = require('../models');

class FormService {
  async createForm(data) {
    const {title, ...fields} = data;

    // Define attributes based on remaining properties
    const attributes = {};
    for (const [fieldName, fieldType] of Object.entries(fields)) {
      attributes[fieldName] = { type: this.getSequelizeType(fieldType) };
    }
    const Model = createModel(tableName, fields);
    await Model.sync();
    return { tableName: title };
  }

  async postInfo(tableName, data) {
    const Model = Database.models[tableName];
    if (!Model) throw { status: 404, message: 'Table not found' };

    const result = await Model.create(data);
    return result;
  }

  async getInfo(tableName) {
    const Model = Database.models[tableName];
    if (!Model) throw { status: 404, message: 'Table not found' };

    const data = await Model.findAll();
    return data;
  }

  
  // Map string types to Sequelize data types
  getSequelizeType(type) {
    switch (type.toLowerCase()) {
      case 'string': return Sequelize.STRING;
      case 'uuid': return Sequelize.UUID;
      case 'email': return Sequelize.STRING;
      case 'number': return Sequelize.INTEGER;
      case 'boolean': return Sequelize.BOOLEAN;
      default: throw new Error(`Invalid field type: ${type}`);
    }
  }
}

module.exports = new FormService();


