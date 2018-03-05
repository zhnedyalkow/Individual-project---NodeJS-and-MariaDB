const {
    JSDOM
} = require('jsdom');
const $init = require('jquery');
const laptopDataNormalization = require('../data_normalization/laptopbg-normalization');

const extractDataFromPageAsync = async (url) => {
    const dom = await JSDOM.fromURL(url);
    const $ = $init(dom.window);

    let brand = $('.frame header h1').html().replace(/\n/g, '');
    brand = brand.substr(0, brand.indexOf(' ')).toUpperCase();
    let laptop = $('.product-characteristics tr:nth-child(1) td a').html().toUpperCase();
    let model = $('.product-characteristics tr:nth-child(4) td a').html().toUpperCase();
    let processor = $('.product-characteristics tr:nth-child(5) td').html().replace(/\n/g, '');
    let ram = $('.product-characteristics tr:nth-child(6) td span').html();
    let video = $('.product-characteristics tr:nth-child(7) td').html().replace(/\n/g, '');
    let hdd = $('.product-characteristics tr:nth-child(8) td').html().replace(/\n/g, '');
    let display = $('.product-characteristics tr:nth-child(9) td').html().replace(/\n/g, '');
    let battery = $('.product-characteristics tr:nth-child(13) td').html().replace(/\n/g, '');
    let weight = $('.product-characteristics tr:nth-child(14) td').html().replace(/\n/g, '');

    let obj = {
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
        url: url
    };

    const newObj = laptopDataNormalization.normalize(obj);
    return newObj;
}

module.exports = {
    extractDataFromPageAsync
}