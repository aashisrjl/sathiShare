const { cloudinary } = require("../cloudinary/index");
const File = require("../model/fileModel");
const fs = require('fs');

exports.postFile = async (req, res) => {
    try {
        // Retrieve IP address
        const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;

        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a file"
            });
        }

        const allowedMimeType = ['application/pdf','image/png','image/jpg','image/jpeg','video/mp4']; //application/pdf
        const mimeType = req.file.mimetype;

        if (!allowedMimeType.includes(mimeType)) {
            return res.status(400).json({
                message: "Only files are accepted"
            });
        }

        // Upload PDF to Cloudinary
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
            resource_type: 'raw',
            folder: 'sathiShare'
        });

        const fileUrl = result.url;

        // Save file details in the database
        await File.create({
            ipAddress: ipAddress,
            file: fileUrl
        });

        // Remove the temporary file from server
        fs.unlinkSync(req.file.path);

        res.status(200).json({
            message: "File uploaded successfully",
            fileUrl: fileUrl
        });
        res.render("files")

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

exports.getAllFile = async(req,res)=>{
    try {
        const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;
        console.log("ip",ipAddress)
        const data = await File.find({ipAddress})
        res.render("files",{files:data});
        
    } catch (error) {
        res.status(500).json({
            message: "Internal error"
        })
    }
}
