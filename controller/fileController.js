const File = require("../model/fileModel");
const fs = require('fs');
const path = require('path');
const schedule = require('node-schedule');
const sendEmail = require("../utils/sendMail");
var userJobs = {}

// Function to generate a random userId
function generateUserId() {
    const digits = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
    return 'f' + digits.toString(); // Prefix 'A' to the 4-digit number
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
        const ipAddress = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.ip;

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

        req.flash("success","file uploaded")
        res.redirect(`/${userId}`);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

exports.getFilesByUserId = async (req, res) => {
    try {
        const [error] = req.flash('error');
        const [success] = req.flash('success');

        const { userId } = req.params; // Extract userId from URL parameters
        

        // Retrieve all files associated with the userId
        const files = await File.find({ userId });

        const url = process.env.BASE_URL;

        if (files.length === 0) {
            
            req.flash('error','no file found for this user');
            res.redirect("/");
        }

        res.render("files", { files: files, url,error,success,userId });

    } catch (error) {
        console.error("Error retrieving files:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

exports.deleteFile = async (req, res) => {
    const ipAddress = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.ip;
    const { id } = req.params;

        const file = await File.findById(id);
        console.log("file", file);
        console.log("ip", ipAddress);
        console.log("id", id);

        if (!file) {
            req.flash('error','no file found');
            res.redirect("/");
        }

        if (ipAddress === file.ipAddress) {
            await File.findByIdAndDelete(id);
            req.flash("success","file deleted successfully");
            res.redirect(`/${file.userId}`);
        } else {
            req.flash("error","you are not authorized!!");
            res.redirect(`/${file.userId}`);
        }
    
};

//send mail
exports.renderEmail = async(req,res)=>{
    const file = req.params.file;
    res.render('email.ejs',{file})  
}

exports.sendmail = async(req,res)=>{
    const file = req.params.file;
    const {email} = req.body;
   sendEmail({
    email,
    subject: "File received from SathiShare",
    text: `You have received a file from SathiShare. Please download it from the link
    <a href="https://sathishare.onrender.com/storage/${file}">Click here to download
    `
   })
   req.flash("success","Mail send Successfully");
   res.redirect("/")


}
//search by userId
exports.handleSearch = async(req,res)=>{
    const {id} = req.params
    if(!id){
        req.flash('error',"please Enter the field")
        res.redirect(`/`)
    }
    const file = await File.find({userId:id})
    if(!file){
        req.flash('error',"file not found")
        res.redirect(`/`)
    }
    req.flash("success","Item Searched");
    res.redirect(`/${id}`);
}
