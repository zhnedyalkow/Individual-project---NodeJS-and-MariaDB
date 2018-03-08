const {
    orderBy,
    filterRam,
    filterHDD,
    filterDisplay,
    showAllRecords,
    filterProcessor,
    searchForSpecificReq,
} = require('../database/db');
const connection = require('../models/index');

/* npm commands */
const command = process.argv[2];

/* npm arguments */
const value = process.argv[3];
const value2 = process.argv[5];
const param = process.argv[4];

    /* -- Running command: --
        npm run statistics search 4GB
    */

if (command === 'search') {
    const search = async (val) => {
        const res = await searchForSpecificReq(val);
        console.log(res);
        connection.sequelize.close();
    };
    search(value);
} else if (command === 'filter') {
    /* -- Running command: --
        npm run statistics filter ram gt 4GB
    */

    if (value === 'hdd') {
        const getFilteredHDDRecords = async (val2, par) => {
            const res = await filterHDD(val2, par);
            console.log(res);
            connection.sequelize.close();
        };
        getFilteredHDDRecords(value2, param);
    } else if (value === 'ram') {
        const getFilteredRamRecords = async (val2, par) => {
            const res = await filterRam(val2, par);
            console.log(res);
            connection.sequelize.close();
        };
        getFilteredRamRecords(value2, param);
    } else if (value === 'processor') {
        const getFilteredProcessorRecords = async (val2, par) => {
            const res = await filterProcessor(val2, par);
            console.log(res);
            connection.sequelize.close();
        };
        getFilteredProcessorRecords(value2, param);
    } else if (value === 'display') {
        const getFilteredDisplayRecords = async (val2, par) => {
            const res = await filterDisplay(val2, par);
            console.log(res);
            connection.sequelize.close();
        };
        getFilteredDisplayRecords(value2, param);
    }

    /* -- Running command: --
        npm run statistics order-by column(processor)
    */
} else if (command === 'order-by') {
    if (value === 'processor') {
        const column = 'processor';
        const orderByProcessor = async (col) => {
            const res = await orderBy(col);
            console.log(res);
            connection.sequelize.close();
        };
        orderByProcessor(column);
    } else if (value === 'hdd') {
        const column = 'hdd';
        const orderByHdd = async (col) => {
            const res = await orderBy(col);
            console.log(res);
            connection.sequelize.close();
        };
        orderByHdd(column);
    } else if (value === 'price') {
        const column = 'price';
        const orderByHdd = async (col) => {
            const res = await orderBy(col);
            console.log(res);
            connection.sequelize.close();
        };
        orderByHdd(column);
    } else if (value === 'display') {
        const column = 'display';
        const orderByDisplay = async (col) => {
            const res = await orderBy(col);
            console.log(res);
            connection.sequelize.close();
        };
        orderByDisplay(column);
    }
} else if (command === 'show') {
    const showAllRec = async () => {
        const res = await showAllRecords();
        console.log(res);
        connection.sequelize.close();
    };
    showAllRec();
}
