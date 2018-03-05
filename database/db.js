const {
    Brand,
    Specifications
} = require('../models');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const checkIfExists = async (obj) => {
    const url = obj.url;
    const res = await Brand.findOne({
        where: {
            url: url
        }
    });

    if (res) {
        return false;
    }
    return true;
}

const addIfNotExistFromList = async (objList, providerId) => {
    await Promise.all(objList.map((obj) => {
        const res = addIfNotExists(obj, providerId);
        return res;
    }));
}

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
            // processor: null,
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

}

// statistics

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
        await Specifications.findAll({
            where: {
                ram: {
                    [column]: value
                }
            }
        });
    const res = filteredRecords.map((rec) => rec.dataValues);
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
        await Specifications.findAll({
            where: {
                hdd: {
                    [column]: value
                }
            }
        });
    const res = filteredRecords.map((rec) => rec.dataValues);
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
        await Specifications.findAll({
            where: {
                processor: {
                    [column]: value
                }
            }
        });
    const res = filteredRecords.map((rec) => rec.dataValues);
    return res;
};

// search for specific requirement

const searchForSpecificReq = async (value) => {
    const filteredRecords =
        await Specifications.findAll({
            where: {
                $or: [{
                        ram: {
                            like: '%' + value + '%'
                        }
                    },
                    {
                        hdd: {
                            like: '%' + value + '%'
                        }
                    },
                    {
                        video: {
                            like: '%' + value + '%'
                        }
                    },
                    {
                        processor: {
                            like: '%' + value + '%'
                        }
                    },
                    {
                        display: {
                            like: '%' + value + '%'
                        }
                    },
                    {
                        battery: {
                            like: '%' + value + '%'
                        }
                    },
                    {
                        weight: {
                            like: '%' + value + '%'
                        }
                    },
                ]
            }
        });

    const res = filteredRecords.map((rec) => rec.dataValues);
    return res;
}

// Order: assuming ascending

const orderBy = async (column) => {
    const orderedRecords =
        await Specifications.findAll({
            order: [
                [column, 'ASC']
            ]
        });
    const res = orderedRecords.map((rec) => rec.dataValues);
    return res;
}

module.exports = {
    orderBy,
    filterRam,
    filterHDD,
    filterProcessor,
    addIfNotExistFromList,
    searchForSpecificReq,
}