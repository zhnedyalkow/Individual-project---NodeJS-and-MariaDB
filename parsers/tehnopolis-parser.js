const {
    JSDOM
} = require('jsdom');
const $init = require('jquery');
const tehnopolisDataNormalization = require('../data_normalization/tehnopolis-normalization');

const extractDataFromPageAsync = async (url) => {
   try {
    const dom = await JSDOM.fromURL(url);
    const $ = $init(dom.window);

    let brand = $('.table-characteristics tr:nth-child(1) td:nth-child(2)').html();
    let model = $('.table-characteristics tr:nth-child(2) td:nth-child(2)').html();
    let laptop = $('.table-characteristics tr:nth-child(3) td:nth-child(2)').html();
    let ram = $('.table-characteristics tr:nth-child(4) td:nth-child(2)').html();
    let hdd = $('.table-characteristics tr:nth-child(5) td:nth-child(2)').html();
    let hard = $('.table-characteristics tr:nth-child(6) td:nth-child(2)').html();
    let weight = $('.table-characteristics tr:nth-child(7) td:nth-child(2)').html();
    let processor = $('.table-characteristics tr:nth-child(9) td:nth-child(2)').html();
    let typeProcessor = $('.table-characteristics tr:nth-child(10) td:nth-child(2)').html();
    let display = $('.table-characteristics tr:nth-child(10) td:nth-child(2)').html();
    let processorChar = $('.table-characteristics tr:nth-child(12) td:nth-child(2)').html();
    let video = $('.table-characteristics tr:nth-child(17) td:nth-child(2)').html();
    let battery = $('.table-characteristics tr:nth-child(26) td:nth-child(2)').html().toUpperCase();

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

    const newObj = tehnopolisDataNormalization.normalize(obj);
    return newObj;
   } catch (error) {
       console.log(error);
       console.log(url);
       throw error;
   }
}

module.exports = {
    extractDataFromPageAsync
}