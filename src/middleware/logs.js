const logRequest =(req, res, next) => {
    console.log('Terjadi request ke Path:', req.path);
    next();
};

module.exports = logRequest;
