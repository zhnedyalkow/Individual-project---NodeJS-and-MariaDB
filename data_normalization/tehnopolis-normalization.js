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
    const url = obj.url;
    // let price = obj.price;
    const processor = obj.processor;

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
        // price: price,
        url: url,
    };
};

const getFilteredRam = (ram) => {
    ram = ram.replace(/\s/g, '');
    const ramMatches = ram.match(/\d+/g);
    if (ramMatches === null) {
        ram = null;
    }
    return ram;
};

const getFilteredHdd = (hdd) => {
    hdd = hdd.replace(/\s/g, '');
    return hdd;
};

const getFilteredDisplay = (display) => {
    display = display.substr(0, display.indexOf(' '));
    const displayDigitMatches = display.match(/\d+/g);
    if (displayDigitMatches === null) {
        display = null;
    }
    return display;
};

const getFilteredBattery = (battery) => {
    battery = battery.slice(0, 6);

    const batteryDigitMatches = battery.match(/\d+/g);
    if (batteryDigitMatches === null) {
        battery = null;
    }
    return battery;
};

const getFilteredWeight = (weight) => {
    weight = weight.slice(0, 3) + 'KG';
    const weightDigitMatches = weight.match(/\d+/g);
    if (weightDigitMatches === null) {
        weight = null;
    }
    return weight;
};

const getRenamedLaptop = (laptop) => {
    if (laptop.includes('ЛАПТОП')) {
        laptop = 'LAPTOP';
    } else if (laptop.includes('НЕТБУК')) {
        laptop = 'NETBOOK';
    } else if (laptop.includes('НОУТБУК')) {
        laptop = 'NOTEBOOK';
    }
    return laptop;
};

module.exports = {
    normalize,
};
