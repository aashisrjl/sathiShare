const File = require("../model/fileModel");
const fs = require('fs');

// Function to generate a random userId
function generateUserId() {
    const digits = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
    return 'A' + digits.toString(); // Prefix 'A' to the 4-digit number
}

exports.postFiles = async (req, res) => {
    try {
        const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;

        // Check if files are uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                message: "Please upload at least one file"
            });
        }

        // Try to find an existing userId based on the IP address
        let existingFile = await File.findOne({ ipAddress });
        let userId;

        if (!existingFile) {
            // Generate a unique userId if no previous record is found for the IP
            userId = generateUserId();
        } else {
            // Use the existing userId
            userId = existingFile.userId;
        }

        const files = req.files;
        const savedFiles = [];

        for (let i = 0; i < files.length; i++) {
            const fileUrl = files[i].filename;

            const savedFile = await File.create({
                userId: userId,
                ipAddress: ipAddress,
                file: fileUrl
            });

            savedFiles.push(savedFile);
        }

        // Redirect to the page showing all files for the userId
        res.redirect(`/file/${userId}`);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

exports.getFilesByUserId = async (req, res) => {
    try {
        const { userId } = req.params; // Extract userId from URL parameters
        console.log("Extracted userId:", userId);

        // Retrieve all files associated with the userId
        const files = await File.find({ userId });
        console.log("Files found:", files);

        const url = "http://localhost:3000/";

        if (files.length === 0) {
            return res.status(404).json({
                message: "No files found for this user"
            });
        }

        res.render("files", { files: files, url });

    } catch (error) {
        console.error("Error retrieving files:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};