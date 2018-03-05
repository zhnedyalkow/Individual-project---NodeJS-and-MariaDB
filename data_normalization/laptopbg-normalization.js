const normalize = (obj) => {
    let ram = obj.ram;
    let hdd = obj.hdd;
    let display = obj.display;
    let battery = obj.battery;
    let weight = obj.weight;
    let laptop = obj.laptop;
    let video = obj.video;
    let brand = obj.brand;
    let model = obj.model;
    let url = obj.url;
    let processor = obj.processor;

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
        url: url
    }
}

const getFilteredRam = (ram) => {
    if (typeof ram !== 'undefined') {
        ram = ram.replace(/\n/g, '').trim();
        ram = ram.substr(0, ram.indexOf(' '));
    } else {
        ram = null;
    }
    return ram;
}

const getFilteredHddData = (hdd) => {
    hdd = hdd.substr(0, hdd.indexOf(' '));
    const hddMatches = hdd.match(/\d+/g);
    if (hddMatches !== null) {
        if (hdd.includes('TB')) {
            hdd = (hddMatches * 1000) + 'GB';
        }
    }
    return hdd;
}
const getFilteredWeightData = (weight) => {
    const weightDigitMatches = weight.match(/\d+/g);
    if (weightDigitMatches === null) {
        weight = null
    } else {
        weight = weightDigitMatches + 'KG';
    }
    return weight;
}

const getFilteredDisplayData = (display) => {
    const displayDigitMatches = display.match(/\d+/g);
    if (displayDigitMatches === null) {
        display = null
    } else {
        display = display.substr(0, display.indexOf(' '));
        display = display.substr(0, display.indexOf('-'));
    }
    return display;
}

const getProcessorData = (processor) => {
    const n = 3; // third space
    processor = processor.toUpperCase();
    let str = processor.split(' ')
    var dataBeforeThirdSpace = str.slice(0, n).join(' ')
    return dataBeforeThirdSpace;
}

const getVideoData = (video) => {
    const n = 4; // fourth space
    video = video.toUpperCase();
    let str = video.split(' ')
    var dataBeforeFourthSpace = str.slice(0, n).join(' ')
    return dataBeforeFourthSpace;
}

const getBatteryData = (battery) => {
    battery = (battery.substr(0, battery.indexOf('-'))) + ' CELL';
    return battery;
}

const getBrandData = (brand) => {
    return brand.replace('А', 'A');
}

module.exports = {
    normalize
}