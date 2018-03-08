const {
    Brand,
    Specifications,
} = require('../models');


const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const checkIfExists = async (obj) => {
    const url = obj.url;
    const res = await Brand.findOne({
        where: {
            url: url,
        },
    });

    if (res) {
        return false;
    }
    return true;
};

const addIfNotExistFromList = async (objList, providerId) => {
    await Promise.all(objList.map((obj) => {
        const res = addIfNotExists(obj, providerId);
        return res;
    }));
};

const addIfNotExists = async (obj, providerId) => {
    try {
        const check = await checkIfExists(obj);

        if (!check) {
            return;
        }

        const brand = (await Brand.create({
            laptop: obj.laptop,
            brand: obj.brand,
            model: obj.model,
            url: obj.url,
            providerId: providerId,

        }));

        await brand.save();

        const specifications = (await Specifications.create({
            processor: obj.processor,
            ram: obj.ram,
            video: obj.video,
            hdd: obj.hdd,
            display: obj.display,
            battery: obj.battery,
            weight: obj.weight,
            brandId: brand.id,
        }));

        await specifications.save();
    } catch (error) {
        console.log('Failed add! ' + obj.url);
        console.log(error);
    }
};

/*  Delete all tables and populate provider table with values */

const resetTablesData = async () => {
    try {
        await Specifications.destroy({
            truncate: {
                cascade: true,
             },
        });

        await Brand.destroy({
            truncate: {
                cascade: true,
             },
        });
    } catch (error) {
        console.log(error);
    }
};

/* Statistics - Filters */

const filterRam = async (value, param) => {
    let column;

    if (param.includes('gt')) {
        column = Op.gt;
    } else if (param.includes('lt')) {
        column = Op.lt;
    } else {
        column = Op.eq;
    }
    const filteredRecords =
        await Brand.findAll({
            include: [{
                model: Specifications,
                where: {
                    ram: {
                        [column]: value,
                    },
                },
            }],
        });
    const res = filteredRecords
        .filter((el) => el !== 'undefined')
        .map((rec) => console.log(rec.get({
            plain: true,
        })));

    return res;
};

const filterHDD = async (value, param) => {
    let column;

    if (param.includes('gt')) {
        column = Op.gt;
    } else if (param.includes('lt')) {
        column = Op.lt;
    } else {
        column = Op.eq;
    }

    const filteredRecords =
        await Brand.findAll({
            include: [{
                model: Specifications,
                where: {
                    hdd: {
                        [column]: value,
                    },
                },
            }],
        });
    const res = filteredRecords
        .map((rec) => console.log(rec.get({
            plain: true,
        })));
    return res;
};

const filterProcessor = async (value, param) => {
    let column;

    if (param.includes('gt')) {
        column = Op.gt;
    } else if (param.includes('lt')) {
        column = Op.lt;
    } else {
        column = Op.eq;
    }

    const filteredRecords =
        await Brand.findAll({
            include: [{
                model: Specifications,
                where: {
                    processor: {
                        [column]: value,
                    },
                },
            }],
        });
    const res = filteredRecords
        .map((rec) => console.log(rec.get({
            plain: true,
        })));

    return res;
};

const filterDisplay = async (value, param) => {
    let column;

    if (param.includes('gt')) {
        column = Op.gt;
    } else if (param.includes('lt')) {
        column = Op.lt;
    } else if (param.includes('eq')) {
        column = Op.eq;
    }

    const filteredRecords =
        await Brand.findAll({
            include: [{
                model: Specifications,
                where: {
                    display: {
                        [column]: value,
                    },
                },
            }],
        });
    const res = filteredRecords
        .map((rec) => console.log(rec.get({
            plain: true,
        })));
    return res;
};

/* Statistics - Search for specific requirement */

const searchForSpecificReq = async (value) => {
    const filteredRecords =
        await Specifications.findAll({
            where: {
                $or: [{
                        ram: {
                            like: '%' + value + '%',
                        },
                    },
                    {
                        hdd: {
                            like: '%' + value + '%',
                        },
                    },
                    {
                        video: {
                            like: '%' + value + '%',
                        },
                    },
                    {
                        processor: {
                            like: '%' + value + '%',
                        },
                    },
                    {
                        display: {
                            like: '%' + value + '%',
                        },
                    },
                    {
                        battery: {
                            like: '%' + value + '%',
                        },
                    },
                    {
                        weight: {
                            like: '%' + value + '%',
                        },
                    },
                ],
            },
        });

    const res = filteredRecords.map((rec) => rec.dataValues);
    return res;
};

// Order: assuming ascending

const orderBy = async (column) => {
    const orderedRecords =
        await Brand.findAll({
            // limit: 10,
            order: [
                [{
                    model: Specifications,
                }, column, 'ASC'],
            ],
            include: [{
                model: Specifications,
            }],
        });

    orderedRecords.map((rec) => console.log(rec.get({
        plain: true,
    })));
};

const showAllRecords = async () => {
    const all =
        await Brand.findAll({
            include: [{
                model: Specifications,
            }],
        });
     all.map((rec) => console.log(rec.get({
        plain: true,
    })));
};

module.exports = {
    orderBy,
    filterRam,
    filterHDD,
    filterProcessor,
    resetTablesData,
    showAllRecords,
    filterDisplay,
    addIfNotExistFromList,
    searchForSpecificReq,
};
