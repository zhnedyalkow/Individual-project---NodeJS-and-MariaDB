const normalize = (obj) => {
    let ram = obj.ram;
    let hdd = obj.hdd;
    let display = obj.display;
    let battery = obj.battery;
    let weight = obj.weight;
    let laptop = obj.laptop;
    let price = obj.price;
    const video = obj.video;
    const brand = obj.brand;
    const model = obj.model;
    const url = obj.url;
    const processor = obj.processor;

    ram = getFilteredRam(ram);
    hdd = getFilteredHdd(hdd);
    display = getFilteredDisplay(display);
    battery = getFilteredBattery(battery);
    weight = getFilteredWeight(weight);
    laptop = getRenamedLaptop(laptop);
	price = getFilteredPrice(price);

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
        price: price,
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

    if (!battery.toUpperCase().includes('CELL')) {
        battery = null;
        return battery;
    }

    const batteryDigitMatches = battery.match(/\d+/g);
    if (batteryDigitMatches === null) {
        battery = null;
        return battery;
    }

    return battery.toUpperCase();
};

const getFilteredWeight = (weight) => {
    weight = weight.slice(0, 3) + 'KG';
    const weightDigitMatches = weight.match(/\d+/g);
    if (weightDigitMatches === null) {
        weight = null;
    }
    return weight;
};

const getFilteredPrice = (price) => {
    price = price
    .replace(/\s/g, '')
    .match(/\d+/g)[0];
    return price;
};

const getRenamedLaptop = (laptop) => {
    if (laptop.includes('ЛАПТОП')) {
        laptop = 'LAPTOP';
    } else if (laptop.includes('НЕТБУК')) {
        laptop = 'NETBOOK';
    } else if (laptop.includes('НОУТБУК')) {
        laptop = 'NOTEBOOK';
    } else if (laptop.includes('УЛТРАБУК')) {
        laptop = 'ULTRABOOK';
    }
    return laptop;
};

module.exports = {
    normalize,
};
