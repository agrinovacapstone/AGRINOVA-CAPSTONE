const multer= require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        const timestamp = new Date().getTime();
        console.log(file);
        const originalname = file.originalname;
        // const extension = path.extension(file.originalName);

        cb(null, `${timestamp}-${originalname}`);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1000 * 1000 //5 MB
    }
});

module.exports = upload;