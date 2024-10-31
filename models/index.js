const Database = require('../config/database');
const { DataTypes } = require('sequelize');

module.exports.createModel = (tableName, fields) => {
  const attributes = {};
  fields.forEach(field => {
    attributes[field.name] = { type: DataTypes[field.type.toUpperCase()] };
  });
  return Database.define(tableName, attributes, { freezeTableName: true });
};
