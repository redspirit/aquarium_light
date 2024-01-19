const ms = require('ms');

const sleep = (time = '1m') => {
    return new Promise(resolve => setTimeout(resolve, ms(time)));
}

module.exports = {
    sleep,
}