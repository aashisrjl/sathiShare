const multer = require('multer')
const storage = multer.diskStorage({
    filename: function(req,file,cb){
        cb(null,Date.now() + "-"+ file.originalname)
    },
    destination: function (req, file, cb) {
        // Use the destination folder defined above
        cb(null, './storage');
    }
})

module.exports ={
    multer,
    storage
}