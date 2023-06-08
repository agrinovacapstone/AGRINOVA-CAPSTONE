const express = require('express')
const router = express.Router();

const {
    getManggo,
    predictManggo,
    deleteManggo,
} = require('../controller/manggo');

router.get('/', getManggo);
router.post('/', predictManggo);
router.delete('/', deleteManggo);

module.exports = router;