const cloudinary = require('cloudinary')
const {CloudinaryStorage} = require('multer-storage-cloudinary')

//config
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET

})

// const  storage = new CloudinaryStorage({
//     cloudinary,
//     params:{
//         folder: "storage_for_namaskar_node",
//         allowedFormat: ['jpeg','jpg','png','mp4']
//     }
// })

module.exports = {
    cloudinary
}