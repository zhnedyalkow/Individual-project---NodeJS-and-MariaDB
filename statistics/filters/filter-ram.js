const {
    filterRam,
} = require('../../database/db');
const connection = require('../../models/index');

const filterByRam = async (ram, param) => {
    const res = await filterRam(ram, param);
    console.log(res);
}

const run = async () => {
    await filterByRam(ram, param);
    await connection.sequelize.close();
}


const ram = '4GB';
const param = 'eq';

run();


module.exports = {
    run
}