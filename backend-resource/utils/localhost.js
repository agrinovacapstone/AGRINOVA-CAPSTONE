const domain = process.env.DOMAIN || 'api.agrinova.ml';
const hostname = process.env.NODE_ENV !== 'production' ?
    'localhost' : domain;

module.exports = hostname;
