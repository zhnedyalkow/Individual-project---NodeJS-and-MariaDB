const {
    orderBy,
} = require('../../database/db');
const connection = require('../../models/index');

const col = 'ram';
const orderByRam = async (col) => {
    const res = await orderBy(col);
    console.log(res);
}

const run = async () => {
    await orderByRam(col);
    await connection.sequelize.close();
}
run();

module.exports = {
    run
}