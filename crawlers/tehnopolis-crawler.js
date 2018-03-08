const _ = require('lodash');
const db = require('../database/db.js');
const $init = require('jquery');
const {
    range,
} = require('../common/helper.js');
const {
    JSDOM,
} = require('jsdom');
const {
    extractDataFromPageAsync,
} = require('../parsers/tehnopolis-parser');
const sequelizeDbWrapper = require('../models/index');

const MAX_REQUESTS = 5;
const url = 'http://www.technopolis.bg/bg//%D0%9A%D0%BE%D0%BC%D0%BF%D1%8E%D1%82%D1%80%D0%B8-%D0%B8-%D0%BF%D0%B5%D1%80%D0%B8%D1%84%D0%B5%D1%80%D0%B8%D1%8F/%D0%9B%D0%B0%D0%BF%D1%82%D0%BE%D0%BF%D0%B8/c/P11010101';
const pageurl = 'http://www.technopolis.bg/bg//Компютри-и-периферия/Лаптопи/c/P11010101?pageselect=24&page=';


const getMaxPageAsync = async (url, max) => {
    const dom = await JSDOM.fromURL(url);
    const $ = $init(dom.window);

    const selector = $('.paging a');
    let current = [...selector]
        .map((el) => el.innerHTML)
        .filter((el) => isNaN(el) === false)
        .map(Number)
        .pop();

    if (max > current) {
        return max;
    } else {
        max = current;
    }

    const lastUrl = (pageurl + max);
    return await getMaxPageAsync(lastUrl, max);
}

const getLaptopUrls = async (link) => {
    let url = 'http://www.technopolis.bg';
    const dom = await JSDOM.fromURL(link);
    const $ = $init(dom.window);
    const laptopHref = [...$('.product-box h2 a')]
        .map((link) => url + $(link).attr('href'));
    return laptopHref;
}

const getListOfUrls = (max) => {
    const tehnopolisLink = `http://www.technopolis.bg/bg//Компютри-и-периферия/Лаптопи/c/P11010101?pageselect=24&page=`;
    const listOfUrls = range(0, max).map((page) => {
        const url = tehnopolisLink + page;
        return url;
    });
    return listOfUrls;
}

const getPagesUrlsRecursive = async (pageUrls, listProductsUrls, currentRequests) => {

    if (pageUrls.length === 0) {
        return;
    }

    const pageUrl = pageUrls.pop();
    const listOfProductsPromise = getLaptopUrls(pageUrl);
    currentRequests.push(listOfProductsPromise);

    console.log('Executing ' + pageUrl);

    if (currentRequests.length === MAX_REQUESTS || pageUrls.length === 0) {
        const currentProductUrlsNested = await Promise.all(currentRequests);
        const currentProductUrls =
            _.chain(currentProductUrlsNested)
            .flatten()
            .sortedUniq()
            .value();

        listProductsUrls.push(...currentProductUrls);
        return getPagesUrlsRecursive(pageUrls, listProductsUrls, []);
    } else {
        return getPagesUrlsRecursive(pageUrls, listProductsUrls, currentRequests);
    }
}

const extractLaptopInfoRecAsync = async (listOfLaptopUrls, laptopInfos, currentRequests) => {
    if (listOfLaptopUrls.length === 0) {
        return;
    }

    const laptopUrl = listOfLaptopUrls.pop();

    console.log('Executing ' + laptopUrl);

    const laptopInfoObjPromise = extractDataFromPageAsync(laptopUrl);
    currentRequests.push(laptopInfoObjPromise);

    if (currentRequests.length === MAX_REQUESTS || listOfLaptopUrls.length === 0) {
        const listOfObjects = await Promise.all(currentRequests);

        laptopInfos.push(...listOfObjects.filter((el) => el !== null ));
        return extractLaptopInfoRecAsync(listOfLaptopUrls, laptopInfos, []);
    } else {
        return extractLaptopInfoRecAsync(listOfLaptopUrls, laptopInfos, currentRequests);
    }
}

const runTehnopolisCrawler = async () => {
    const maxPage = await getMaxPageAsync(url, -1);
    const pageOfUrls = getListOfUrls(maxPage);
    const listOfLinks = [];
    await getPagesUrlsRecursive(pageOfUrls, listOfLinks, []);

    const data = [];
    await extractLaptopInfoRecAsync(listOfLinks, data, []);

    await db.addIfNotExistFromList(data, 2);
    await sequelizeDbWrapper.sequelize.close();

    console.log('ready');
}

runTehnopolisCrawler();

module.exports = {
    runTehnopolisCrawler,
}