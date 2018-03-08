const _range = function* (from, to) {
    if (from === to + 1) {
        return;
    }
    yield from;
    from++;
    yield* _range(from, to);
};

const range = (from, to) => {
    return Array.from(_range(from, to));
};

module.exports = {
    range,
};
