const tf = require('@tensorflow/tfjs-node');
const path = require('path');
const {getImage} = require('../utils/loadImage.js');
const {downloadModel} = require('../utils/downloadModels');
const manggo = require('../controller/manggo');
let modelfile = null;

const label = [
    'healthy',
    'Anthracnose',
    'Bacterial Canker',
    'Cutting Weevil',
    'Die Back',
    'Gall Midge',
    'Powdery Mildew',
    'Sooty Mould',
];
const getManggo = (req, res) => {
    try {
        return res.status(200).json({
            status: 'success',
            data: {
                tomato,
            },
        });
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            status: 'fail',
            message: e.message,
        });
    }
    return res.status(500).json({
        status: 'failed',
        message: 'internal server execption',
    });
};

const predictManggo = (req, res) => {
    try {
        return res.status(200).json({
            status: 'success',
            model: 'model',
            disease: 'disease',
            prediction: 'prediction',
        });
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            status: 'fail',
            message: e.message,
        });
    }
    return res.status(500).json({
        status: 'failed',
        message: 'internal server execption',
    });
};

const deleteManggo = (req, res) => {
    try {
        if (tomato.length < 1) throw Error('manggo already cleared');
        tomato.splice(0, corn.length);
        return res.status(200).json({
            status: 'success',
            message: 'all data cleared',
        });
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            status: 'fail',
            message: e.message,
        });
    }
    return res.status(500).json({
        status: 'failed',
        message: 'internal server execption',
    });
};