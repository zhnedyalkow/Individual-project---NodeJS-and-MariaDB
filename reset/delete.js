const {
    resetTables,
} = require('../database/db');
 // const connection = require('../models/index');

const truncate = async () => {
    await resetTables();
    console.log('Successfully deleted tables!');
};

truncate();

module.exports = {
    truncate,
};
