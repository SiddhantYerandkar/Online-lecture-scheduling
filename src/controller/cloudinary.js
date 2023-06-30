const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv')

dotenv.config()

//configurating the cloudinary by providing credentials
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

//function to uploadFile on cloudinary
exports.uploadFile = async (file) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: 'course-scheduling',public_id: file.originalname }, (error, result) => {
            if (error) {
                return reject({ error });
            }
            return resolve(result.secure_url);
        }).end(file.buffer);
    });
};