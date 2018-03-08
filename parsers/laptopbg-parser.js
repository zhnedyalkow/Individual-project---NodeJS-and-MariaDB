const {
    JSDOM,
} = require('jsdom');
const $init = require('jquery');
const laptopDataNormalization =
    require('../data_normalization/laptopbg-normalization');

const extractDataFromPageAsync = async (url) => {
   try {
    const dom = await JSDOM.fromURL(url);
    const $ = $init(dom.window);

    let brand = $('.frame header h1').html().replace(/\n/g, '');
    brand = brand.substr(0, brand.indexOf(' ')).toUpperCase();
    const laptop = $('.product-characteristics tr:nth-child(1) td a')
        .html()
        .toUpperCase();
    const model = $('.product-characteristics tr:nth-child(4) td a')
        .html()
        .toUpperCase();
    const processor = $('.product-characteristics tr:nth-child(5) td')
        .html()
        .replace(/\n/g, '');
    const ram = $('.product-characteristics tr:nth-child(6) td span')
        .html();
    const video = $('.product-characteristics tr:nth-child(7) td')
        .html()
        .replace(/\n/g, '');
    const hdd = $('.product-characteristics tr:nth-child(8) td')
        .html()
        .replace(/\n/g, '');
    const display = $('.product-characteristics tr:nth-child(9) td')
        .html()
        .replace(/\n/g, '');
    const battery = $('.product-characteristics tr:nth-child(13) td')
        .html()
        .replace(/\n/g, '');
    const weight = $('.product-characteristics tr:nth-child(14) td')
        .html()
        .replace(/\n/g, '');

    // let price = $('.price-container .price')
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
        // price: price,
        url: url,
    };
    const newObj = laptopDataNormalization.normalize(obj);
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
