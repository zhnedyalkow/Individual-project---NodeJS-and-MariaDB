const {
    runLaptopbgCrawler
} = require('./crawlers/laptopbg-crawler');

const {
    runTehnopolisCrawler
} = require('./crawlers/tehnopolis-crawler');

const run = async () => {
    await runLaptopbgCrawler();
    await runTehnopolisCrawler();
}

run();