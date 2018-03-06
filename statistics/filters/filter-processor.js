const {
    filterProcessor,
} = require('../../database/db');
const connection = require('../../models/index');


const testRam = async (value, param) => {
    const res = await filterProcessor(value, param);
    console.log(res);
}

const run = async () => {
    await testRam(processor, param);
    await connection.sequelize.close();
}

const processor = 'INTEL CELERON N3060 DUAL';
const param = 'eq';

run();

module.exports = {
    run
}