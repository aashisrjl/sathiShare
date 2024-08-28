const Text = require("../model/textModel");

function generateUserId() {
    const digits = Math.floor(10000 + Math.random() * 90000); // Generates a random 4-digit number
    return 'T' + digits.toString(); // Prefix 'A' to the 4-digit number
}

exports.renderTextPage = (req,res)=>{
    res.render('text');
}

exports.createText = async(req,res)=>{
    const {title,text} = req.body;
    const ipAddress = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.ip;
    if(!title || !text){
        return res.status(400).json({
            message:"Please fill in all fields"
        })
    }

    let existingFile = await Text.findOne({ ipAddress });
        let userId;

        if (!existingFile) {
            userId = generateUserId();
        } else {
            // Use the existing userId
            userId = existingFile.userId;
        }
        const code = await Text.create({
            userId,
            title,
            text,
            ipAddress
        })
        if (code) {
            // scheduleDeletion(code._id);
           
            res.redirect(`/code/${userId}`)
          } else {
            res.status(500).json({
              status: 500,
              message: "Something went wrong",
            });
          }

}
exports.getAllText = async(req,res)=>{
    const {userId} = req.params;
    const text = await Text.find({userId})
    if(text.length === 0){
        return res.status(400).json({
            message:"No text found"
        })
    }
    res.render("allText",{texts:text});
}
exports.getSingleText = async(req,res)=>{
    const id = req.params.id;
    const text = await Text.findById(id);
    res.render('singleText',{text});
}

exports.deleteText = async(req,res)=>{
    const ipAddress = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.ip;
    const {id} = req.params;
    const text =await Text.findById(id);
    if(!text){
        return res.status(400).json({
            message:"No text found"
            })
       }
       if(ipAddress == text.ipAddress){
        await Text.findByIdAndDelete(id);
        res.redirect(`/code/${text.userId}`)
        }else{
            return res.status(401).json({
                message:"You are not authorized to delete this text"
                })
        }
}