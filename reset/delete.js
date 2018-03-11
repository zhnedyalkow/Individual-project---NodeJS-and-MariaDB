const {
    resetTables,
} = require('../database/db');
const connection = require('../models/index');

const truncate = async () => {
    await resetTablesData();
    await connection.sequelize.close();
    console.log('Successfully deleted records!');
};

truncate();

module.exports = {
    truncate,
};
