const {
    filterHDD,
} = require('../../database/db');


const hdd = '1000GB';
const param = 'lt';

const testHDD = async (hdd, param) => {
    const res = await filterHDD(hdd, param);
    console.log(res);
}

testHDD(hdd, param);
