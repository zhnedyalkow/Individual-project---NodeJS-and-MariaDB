const {
    JSDOM,
} = require('jsdom');
const $init = require('jquery');
const tehnopolisDataNormalization =
    require('../data_normalization/tehnopolis-normalization');

const extractDataFromPageAsync = async (url) => {
   try {
    const dom = await JSDOM.fromURL(url);
    const $ = $init(dom.window);

    const brand = $('.table-characteristics tr:nth-child(1) td:nth-child(2)')
        .html();
    const model = $('.table-characteristics tr:nth-child(2) td:nth-child(2)')
        .html();
    const laptop = $('.table-characteristics tr:nth-child(3) td:nth-child(2)')
        .html();
    const ram = $('.table-characteristics tr:nth-child(4) td:nth-child(2)')
        .html();
    const hdd = $('.table-characteristics tr:nth-child(5) td:nth-child(2)')
        .html();
    const weight = $('.table-characteristics tr:nth-child(7) td:nth-child(2)')
        .html();
    const processor =
         $('.table-characteristics tr:nth-child(9) td:nth-child(2)')
        .html();
    const display = $('.table-characteristics tr:nth-child(10) td:nth-child(2)')
        .html();
    const video = $('.table-characteristics tr:nth-child(17) td:nth-child(2)')
        .html();
    const battery = $('.table-characteristics tr:nth-child(26) td:nth-child(2)')
        .html();

    // let price = $('.prices .priceValue')
    // .html()
    // .match(/\d+/g)[0];

    const obj = {
        laptop: laptop,
        brand: brand,
        model: model,
        processor: processor,
        ram: ram,
        video: video,
        hdd: hdd,
        display: display,
        battery: battery,
        weight: weight,
        // price,
        url: url,
    };

    const newObj = tehnopolisDataNormalization.normalize(obj);
    return newObj;
   } catch (error) {
       console.log(error);
       console.log(url);
       return null;
   }
};

module.exports = {
    extractDataFromPageAsync,
};
