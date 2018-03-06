const {
    searchForSpecificReq,
} = require('../../database/db');

const hdd = '1000GB';
const display = 15.6;

const testSearch = async (value) => {
    const res = await searchForSpecificReq(value);
    console.log(res);
}

testSearch(display);
