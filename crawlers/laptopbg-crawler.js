const _ = require('lodash');
const db = require('../database/db');
const $init = require('jquery');
const sequelizeDbWrapper = require('../models/index');
const {
    JSDOM,
} = require('jsdom');
const {
    range,
} = require('../common/helper.js');
const {
    extractDataFromPageAsync,
} = require('../parsers/laptopbg-parser');


const url = `https://laptop.bg/laptops-all`;
const pageurl = 'https://laptop.bg/laptops-all?page=';
const MAX_REQUESTS = 5;

const getMaxPageAsync = async (singleUrl, max) => {
    const dom = await JSDOM.fromURL(singleUrl);
    const $ = $init(dom.window);

    const selector = $('.pagination a');
    const current = [...selector]
        .map((el) => el.innerHTML)
        .filter((x) => isNaN(x) === false)
        .map(Number)
        .pop();

    if (max > current) {
        return max;
    }
        max = current;


    const lastUrl = (pageurl + max);
    return await getMaxPageAsync(lastUrl, max);
};

const getLaptopUrls = async (link) => {
    const dom = await JSDOM.fromURL(link);
    const $ = $init(dom.window);
    const laptopHref = [...$('.products li > article > div:first-child a')]
        .map((anchorLink) => $(anchorLink).attr('href'));
    return laptopHref;
};

const getListOfUrls = (max) => {
    const laptopbgLink = `https://laptop.bg/laptops-all?page=`;
    const listOfUrls = range(1, max).map((page) => {
        const sigleUrl = laptopbgLink + page;
        return sigleUrl;
    });
    return listOfUrls;
};

const getPagesUrlsRecursive =
        async (pageUrls, listProductsUrls, currentRequests) => {
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
    }
        return getPagesUrlsRecursive(pageUrls, listProductsUrls, currentRequests);
};

const extractLaptopInfoRecAsync =
    async (listOfLaptopUrls, laptopInfos, currentRequests) => {
    if (listOfLaptopUrls.length === 0) {
        return;
    }

    const laptopUrl = listOfLaptopUrls.pop();

    console.log('Executing ' + laptopUrl);

    const laptopInfoObjPromise = extractDataFromPageAsync(laptopUrl);
    currentRequests.push(laptopInfoObjPromise);

    if (currentRequests.length === MAX_REQUESTS || listOfLaptopUrls.length === 0) {
        const listOfObjects = await Promise.all(currentRequests);

        laptopInfos.push(...listOfObjects.filter((el) => el !== null));
        return extractLaptopInfoRecAsync(listOfLaptopUrls, laptopInfos, []);
    }
        return extractLaptopInfoRecAsync(listOfLaptopUrls, laptopInfos, currentRequests);
};

const runLaptopbgCrawler = async () => {
    const maxPage = await getMaxPageAsync(url, -1);
    const pageOfUrls = getListOfUrls(maxPage);
    const listOfLinks = [];
    await getPagesUrlsRecursive(pageOfUrls, listOfLinks, []);

    const data = [];
    await extractLaptopInfoRecAsync(listOfLinks, data, []);

    await db.addIfNotExistFromList(data, 1);
    await sequelizeDbWrapper.sequelize.close();

    console.log('ready');
};

runLaptopbgCrawler();

module.exports = {
    runLaptopbgCrawler,
};
