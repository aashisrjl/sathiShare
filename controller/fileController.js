const File = require("../model/fileModel");
const fs = require('fs');
const path = require('path');
const schedule = require('node-schedule');
const sendEmail = require("../utils/sendMail");
const Text = require("../model/textModel");
var userJobs = {}

// Function to generate a random userId
function generateUserId() {
    const digits = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
    return 'f' + digits; // Prefix 'A' to the 4-digit number
}

const { cloudinary } = require('../middleware/multerConfig');

const scheduleDeletion = (userId) => {
    userJobs[userId] = schedule.scheduleJob(
        new Date(Date.now() + 24 * 60 * 60 * 1000),
        async () => {
            console.log("Scheduled deletion triggered for userId:", userId);
            try {
                const files = await File.find({ userId });
                if (files.length) {
                    for (const file of files) {
                        try {
                            if (file.publicId) {
                                await cloudinary.uploader.destroy(file.publicId, { resource_type: 'auto' });
                                console.log("Cloudinary file deleted:", file.publicId);
                            }
                        } catch (err) {
                            console.error("Error deleting from Cloudinary:", err);
                        }
                    }
                    await File.deleteMany({ userId });
                    delete userJobs[userId];
                }
            } catch (error) {
                console.error("Error during scheduled file deletion:", error);
            }
        }
    );
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
            // multer-storage-cloudinary provides path (URL) and filename (Public ID)
            const fileUrl = files[i].path;
            const publicId = files[i].filename;

            const savedFile = await File.create({
                userId: userId,
                ipAddress: ipAddress,
                file: fileUrl,
                publicId: publicId
            });
            scheduleDeletion(userId);

            savedFiles.push(savedFile);
        }

        req.flash("success","file uploaded")
        res.redirect(`/file/${userId}`);

    } catch (error) {
        console.error(error);
        fs.appendFileSync('/tmp/sathishare_error.log', `Error in postFiles: ${error.stack}\n`);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

exports.getFilesByUserId = async (req, res) => {
    try {
        const [error] = req.flash('error');
        const [success] = req.flash('success');
        console.log("Fetching files for userId:", req.params.userId);

        const { userId } = req.params;
        if (!userId) {
            req.flash('error', 'User ID is required');
            return res.redirect("/");
        }

        const files = await File.find({ userId });
        const url = process.env.BASE_URL;

        if (files.length === 0) {
            req.flash('error', 'No file found for this user');
            return res.redirect("/");
        }

        res.render("files", { files, url, error, success, userId });

    } catch (error) {
        console.error("Error retrieving files:", error);
        // If headers already sent, don't try to respond again
        if (!res.headersSent) {
            res.status(500).json({
                message: "Internal server error"
            });
        }
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
            if (file.publicId) {
                try {
                    await cloudinary.uploader.destroy(file.publicId, { resource_type: 'auto' });
                } catch (err) {
                    console.error("Cloudinary manual delete error:", err);
                }
            }
            await File.findByIdAndDelete(id);
            req.flash("success","file deleted successfully");
            res.redirect(`/file/${file.userId}`);
        } else {
            req.flash("error","you are not authorized!!");
            res.redirect(`/file/${file.userId}`);
        }
    
};

//send mail
exports.renderEmail = async(req,res)=>{
      const [error] = req.flash('error');
    const [success] = req.flash('success');
    const file = req.params.file;
    res.render('email.ejs',{file,error,success})  
}

exports.sendmail = async(req,res)=>{
    const file = req.params.file;
    const {email} = req.body;
    const fileUrl = file; // 'file' is already the full Cloudinary URL
    
    const htmlTemplate = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #4f46e5; margin: 0;">SathiShare</h1>
            <p style="color: #64748b; margin: 4px 0 0;">Seamless Sharing with Friends</p>
        </div>
        <div style="padding: 24px; background-color: #f8fafc; border-radius: 8px; margin-bottom: 24px;">
            <p style="margin: 0 0 16px; color: #1e293b; font-size: 16px;">Hello!</p>
            <p style="margin: 0 0 24px; color: #475569; line-height: 1.6;">You have received a file from SathiShare: <strong>${file}</strong>. Click the button below to download it.</p>
            <div style="text-align: center;">
                <a href="${fileUrl}" style="display: inline-block; padding: 14px 28px; background-color: #4f46e5; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);">Download File</a>
            </div>
        </div>
        <div style="text-align: center; color: #94a3b8; font-size: 12px;">
            <p style="margin: 0;">&copy; 2025 SathiShare. All rights reserved.</p>
        </div>
    </div>
    `;

    try {
        await sendEmail({
            email,
            subject: "📁 File received from SathiShare",
            text: `You have received a file from SathiShare: ${file}. Download it here: ${fileUrl}`,
            html: htmlTemplate
        });
        
        console.log("Email sent successfully");
        req.flash("success", "Mail sent successfully!");
        return res.redirect("/");
    } catch (error) {
        console.error("Error sending email:", error);
        req.flash("error", "Mail could not be sent. Please try again.");
        return res.redirect("/file/email/" + encodeURIComponent(file));
    }
}
// //search by userId
// exports.handleSearch = async(req,res)=>{
//     const {id} = req.params
//     if(!id){
//         req.flash('error',"please Enter the field")
//         res.redirect(`/`)
//     }
//     const file = await File.find({userId:id})
//     if(!file){
//         req.flash('error',"file not found")
//         res.redirect(`/`)
//     }
//     req.flash("success","Item Searched");
//     res.redirect(`/${id}`);
// }

exports.handleSearch = async(req, res)=> {
    const { id } = req.params;

    if (!id) {
        req.flash('error', 'Please enter a search term');
        return res.redirect('/');
    }

    try {
        // Search for both File and Text by userId
        const file = await File.find({ userId: id });
        const text = await Text.find({ userId: id });

        // If neither file nor text is found
        if (!file.length && !text.length) {
            req.flash('error', 'No files or text found');
            return res.redirect('/');
        }

        // If only files are found
        if (file.length && !text.length) {
            req.flash('success', 'Files found');
            return res.redirect(`/file/${id}`);
        }

        // If only text is found
        if (!file.length && text.length) {
            req.flash('success', 'Text found');
            return res.redirect(`/text/${id}`);
        }

        // If both are found (optional: prioritize one or handle both)
        req.flash('success', 'Items found');
        return res.redirect(`/file/${id}`); // Prioritize files, or customize as needed
    } catch (error) {
        req.flash('error', 'An error occurred during search');
        return res.redirect('/');
    }
}

exports.getMyFiles = async(req,res)=>{
    const ipAddress = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.ip;
    let existingFile = await File.findOne({ ipAddress });
    if(!existingFile){
        req.flash('error','No files found for your IP');
        return res.redirect('/');
    }
    const userId = existingFile.userId;
    console.log("userId", userId);
    res.redirect(`/file/${userId}`);
};