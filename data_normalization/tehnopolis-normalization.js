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

    ram = getFilteredRam(ram);
    hdd = getFilteredHdd(hdd);
    display = getFilteredDisplay(display);
    battery = getFilteredBattery(battery);
    weight = getFilteredWeight(weight);
    laptop = getRenamedLaptop(laptop);

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
    ram = ram.replace(/\s/g, '');
    const ramMatches = ram.match(/\d+/g);
    if (ramMatches === null) {
        ram = null;
    }
    return ram;
}

const getFilteredHdd = (hdd) => {
    hdd = hdd.replace(/\s/g, '');
    return hdd;
}

const getFilteredDisplay = (display) => {
    display = display.substr(0, display.indexOf(' '));
    const displayDigitMatches = display.match(/\d+/g);
    if (displayDigitMatches === null) {
        display = null;
    }
    return display;
}

const getFilteredBattery = (battery) => {
    let batteryParts = battery.match(/^(\S+? \S+?) ([\s\S]+?)$/);
    battery = battery.slice(0, 6);

    const batteryDigitMatches = battery.match(/\d+/g);
    if (batteryDigitMatches === null) {
        battery = null;
    }
    return battery;
}

const getFilteredWeight = (weight) => {
    weight = weight.slice(0, 3) + 'KG';
    const weightDigitMatches = weight.match(/\d+/g);
    if (weightDigitMatches === null) {
        weight = null
    }
    return weight;
}

const getRenamedLaptop = (laptop) => {
    if (laptop.includes('ЛАПТОП')) {
        laptop = 'LAPTOP'
    } else if (laptop.includes('НЕТБУК')) {
        laptop = 'NETBOOK'
    } else if (laptop.includes('НОУТБУК')) {
        laptop = 'NOTEBOOK'
    }
    return laptop;
}

module.exports = {
    normalize
}