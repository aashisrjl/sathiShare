const File = require("../model/fileModel");
const fs = require('fs');
const path = require('path');
const schedule = require('node-schedule');
var userJobs = {}

// Function to generate a random userId
function generateUserId() {
    const digits = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
    return 'A' + digits.toString(); // Prefix 'A' to the 4-digit number
}

const scheduleDeletion = (userId) => {
    userJobs[userId] = schedule.scheduleJob(
        new Date(Date.now() + 24 * 60 * 60 * 1000),
        async () => {
            console.log("Scheduled deletion triggered for userId:", userId);
            try {
                const files = await File.find({ userId });
                if (files.length) {
                    for (const file of files) {
                        const filePath = path.join(__dirname, '../storage/', file.file);
                        fs.unlink(filePath, (err) => {
                            if (err) {
                                console.error("Error deleting file:", filePath, err);
                            } else {
                                console.log("File deleted successfully:", filePath);
                            }
                        });
                    }
                    await File.deleteMany({ userId });
                    delete userJobs[userId];
                    console.log("Remaining jobs:", userJobs);
                }
            } catch (error) {
                console.error("Error during scheduled file deletion:", error);
            }
        }
    );
    console.log("Scheduled jobs:", userJobs);
};

exports.postFiles = async (req, res) => {
    try {
        const ipAddress =  req.ip;//req.headers['x-forwarded-for'] || req.connection.remoteAddress ||

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
            scheduleDeletion(userId);

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
        

        // Retrieve all files associated with the userId
        const files = await File.find({ userId });

        const url = process.env.BASE_URL;

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

exports.deleteFile = async (req, res) => {
    const ipAddress = req.ip;
    const { id } = req.params;

        const file = await File.findById(id);
        console.log("file", file);
        console.log("ip", ipAddress);
        console.log("id", id);

        if (!file) {
            return res.status(400).json({
                message: "No text found"
            });
        }

        if (ipAddress === file.ipAddress) {
            await File.findByIdAndDelete(id);
            res.redirect(`/file/${file.userId}`);
        } else {
            return res.status(401).json({
                message: "You are not authorized to delete this text"
            });
        }
    
};
