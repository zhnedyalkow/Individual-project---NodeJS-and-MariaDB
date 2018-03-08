const normalize = (obj) => {
    const ram = obj.ram;
    const hdd = obj.hdd;
    const display = obj.display;
    const battery = obj.battery;
    const weight = obj.weight;
    const laptop = obj.laptop;
    const video = obj.video;
    const brand = obj.brand;
    const model = obj.model;
    // let price = obj.price;
    const url = obj.url;
    const processor = obj.processor;

    brand = getBrandData(brand);
    video = getVideoData(video);
    ram = getFilteredRam(ram);
    hdd = getFilteredHddData(hdd);
    display = getFilteredDisplayData(display);
    battery = getBatteryData(battery);
    processor = getProcessorData(processor);
    weight = getFilteredWeightData(weight);

    return {
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
};

const getFilteredRam = (ram) => {
    if (typeof ram !== 'undefined') {
        ram = ram.replace(/\n/g, '').trim();
        ram = ram.substr(0, ram.indexOf(' '));
    } else {
        ram = null;
    }
    return ram;
};

const getFilteredHddData = (hdd) => {
    hdd = hdd.substr(0, hdd.indexOf(' '));
    const hddMatches = hdd.match(/\d+/g);
    if (hddMatches !== null) {
        if (hdd.includes('TB')) {
            hdd = (hddMatches * 1000) + 'GB';
        }
    }
    return hdd;
};

const getFilteredWeightData = (weight) => {
    const weightDigitMatches = weight.match(/\d+/g);
    if (weightDigitMatches === null) {
        weight = null;
    } else {
        weight = weightDigitMatches + 'KG';
    }
    return weight;
};

const getFilteredDisplayData = (display) => {
    const displayDigitMatches = display.match(/\d+/g);
    if (displayDigitMatches === null) {
        display = null;
    } else {
        display = display.substr(0, display.indexOf(' '));
        display = display.substr(0, display.indexOf('-'));
    }
    return display;
};

const getProcessorData = (processor) => {
    const n = 3; // third space
    processor = processor.toUpperCase();
    const str = processor.split(' ');
    const dataBeforeThirdSpace = str.slice(0, n).join(' ');
    return dataBeforeThirdSpace;
};

const getVideoData = (video) => {
    const n = 4; // fourth space
    video = video.toUpperCase();
    const str = video.split(' ');
    const dataBeforeFourthSpace = str.slice(0, n).join(' ');
    return dataBeforeFourthSpace;
};

const getBatteryData = (battery) => {
    // const batteryDigitMatches = battery.match(/\d+/g);
    // if (batteryDigitMatches === null) {
    //     battery = null
    // }
    // else {
        battery = (battery.substr(0, battery.indexOf('-'))) + ' CELL';
    // }
    return battery;
};

const getBrandData = (brand) => {
    return brand.replace('А', 'A');
};

module.exports = {
    normalize,
};
