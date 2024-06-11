const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/eventimg');
    },

    filename: function (req, file, cb) {
        const imagename = `${Date.now()}${path.extname(file.originalname)}`
        cb(null, imagename);
    }
});
const eventimage = multer({ storage: storage });

module.exports = eventimage;