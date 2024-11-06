const Database = require('../config/database');
const { DataTypes } = require('sequelize');
const getSequelizeType = require("../utils/getSequelizeType.js")

class FormService {
  async createForm(data) {
    const { title, ...fields } = data;

    // Define attributes based on remaining properties
    const attributes = {};
    for (const [fieldName, fieldType] of Object.entries(fields)) {
      attributes[fieldName] = { type: getSequelizeType(fieldType) };
    }
    const existingForm = await Database.models.FormMetadata.findOne({ where: { tableName: title } });
    if (existingForm){
      throw {status: 409, message: `Form ${title} already exists.`};
    }

    const Model = Database.define(title, attributes, { freezeTableName: true });
    await Model.sync();

    await Database.models.FormMetadata.create({tableName: title, fields});

    return { tableName: title };
  }

  async postInfo(tableName, data) {
    const Model = Database.models[tableName];
    if (!Model) throw { status: 404, message: 'Form not found' };

    const validationError = this.validateDataTypes(Model, data);
    if (validationError){
      throw {status: 400, message: validationError};
    }

    const result = await Model.create(data);
    return result;
  }

  async getInfo(tableName) {
    const Model = Database.models[tableName];
    if (!Model) throw { status: 404, message: 'Form not found' };

    const data = await Model.findAll();
    return data;
  }

  // Validate data types of incoming data against model's schema
  validateDataTypes(Model, data) {
    const modelAttributes = Model.rawAttributes;

    for (const [fieldName, fieldValue] of Object.entries(data)) {
      const attribute = modelAttributes[fieldName];
      if (!attribute) {
        return `Field "${fieldName}" is not defined in the schema`;
      }

      const fieldType = attribute.type.constructor.key;
      if (!this.isTypeMatch(fieldType, fieldValue)) {
        return `Invalid type for field "${fieldName}": expected ${fieldType}, received ${typeof fieldValue}`;
      }
    }
    return null; // Return null if all fields are valid
  }

  // Check if data type matches
  isTypeMatch(type, value) {
    switch (type) {
      case 'STRING':
        return typeof value === 'string';
      case 'UUID':
        return typeof value === 'string';
      case 'INTEGER':
        return Number.isInteger(value);
      case 'BOOLEAN':
        return typeof value === 'boolean';
      default:
        return false;
    }
  }
}

module.exports = new FormService();


