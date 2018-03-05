const {
    orderBy,
    filterHDD,
    filterRam,
    filterProcessor,
    searchForSpecificReq
    
} = require('./database/db.js');


// var process.argv = ['node', 'statistics.js', 'x', 'y'];

// node test4.js firstarg secondarg
// for (i = 2; i < process.argv.length; i++){
//     console.log(process.argv[i]);
// }

const orderBySpecificColumn = async (column) => {
    const res = await orderBy(column);
    return res;
}

const filter = (column) => {
  
    const filterByHDD = async (hdd, param) => {
        const res = await filterHDD(hdd, param);
        return res;
    }

    const filterByRam = async (ram, param) => {
        const res = await filterRam(ram, param);
        return res;
    }

    const filterByProcessor = async (processor, param) => {
        const res = await filterProcessor(processor, param);
        return res;
    }
}

const search = async (value) => {
    const res = await searchForSpecificReq(value);
    return res;
}

process.argv[0] == "node"

process.argv[1] == "statistics.js"

process.argv[2] == 'order'

process.argv[3] == "second arg"

process.argv[4] == "third arg"

process.argv.forEach(function (val, index, array) {
    console.log(index + ' : ' + val);
});

const order_by_hdd = orderBySpecificColumn(hdd);