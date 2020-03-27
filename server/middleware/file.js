/**
 * Title: middleware/file.js
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
const multer = require('multer');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  // send image to correct desination
  destination: (req, file, cb) => {
    // make sure file type is valid
    const isValid = MIME_TYPE_MAP[file.mimetype];
    // throw error if not
    let error = new Error('Invalid file type!');
    if (isValid) {
      error = null;
    }
    cb(error, 'Server/images');
  },
  // name file correctly
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(' ')
      .join('-');
    // add on file extension
    const ext = MIME_TYPE_MAP[file.mimetype];
    // add current date to filename
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

module.exports = multer({ storage }).single('image');
