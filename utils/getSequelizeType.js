const { DataTypes } = require('sequelize');
// Map string types to Sequelize data types
function getSequelizeType(type) {
    switch (type.toLowerCase()) {
        case 'uuid': return DataTypes.UUID;
        case 'string': return DataTypes.STRING;
        case 'email': return DataTypes.STRING;
        case 'number': return DataTypes.INTEGER;
        case 'integer': return DataTypes.INTEGER;
        case 'boolean': return DataTypes.BOOLEAN;
        default: throw new Error(`Invalid field type: ${type}`);
    }
}

module.exports = getSequelizeType;