const cloudinary = require('cloudinary').v2;
// import cloudinary from 'cloudinary';
cloudinary.config({
  cloud_name: "prlncvvp",
  api_key: "391837531946656",
  api_secret: "pOg9qLWROKe3fVDF8LqS2BEO8KI",
});
module.exports = cloudinary;