const { Sequelize, DataTypes } = require('sequelize');
const getSequelizeType = require('../utils/getSequelizeType')
require('dotenv').config()

const database = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const dialect = process.env.DB_DIALECT;

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
  logging: false,
});


const FormMetadata = sequelize.define('FormMetadata', {
  tableName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  fields: {
    type: DataTypes.JSON, // Store fields as JSON to include names and types
    allowNull: false,
  }
});


async function loadDynamicModels() {
  try {
    await FormMetadata.sync();
    const forms = await FormMetadata.findAll();
    for (const form of forms){
      const attributes = {};
      for (const [fieldName, fieldType] of Object.entries(form.fields)) {
        attributes[fieldName] = { type: getSequelizeType(fieldType)};
      }
      const currentTable = sequelize.define(form.tableName, attributes, { freezeTableName: true });
      await currentTable.sync();
      const ggdata = await sequelize.models[form.tableName].findAll();
      const ffdata = await currentTable.findAll();
    };
    
    console.log("Dynamic models loaded successfully")
  } catch (error) {
    console.error("Error loading dynamic models:", error)
  }
}

sequelize.authenticate().then(async () => {
  console.log("Database Connected successfully.");
  await loadDynamicModels();
}).catch((error) => {
  console.log("Unable to connect to the database:", error)
})

module.exports = sequelize;