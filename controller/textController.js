const Text = require("../model/textModel");

function generateUserId() {
    const digits = Math.floor(10000 + Math.random() * 90000); // Generates a random 4-digit number
    return 'T' + digits.toString(); // Prefix 'A' to the 4-digit number
}

exports.renderTextPage = (req,res)=>{
    const [error] = req.flash('error');
    const [success] = req.flash('success');
    res.render('text',{error,success});
}

exports.createText = async(req,res)=>{
    const {title,text} = req.body;
    const ipAddress = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.ip;
    if(!title || !text){
        req.flash('error','please Enter all fields')
        res.redirect('/text/')
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
           req.flash('success','Shared Successfully');
            res.redirect(`/code/${userId}`)
          } else {
            res.status(500).json({
              status: 500,
              message: "Something went wrong",
            });
          }

}
exports.getAllText = async(req,res)=>{
    const [error] = req.flash('error');
    const [success] = req.flash('success');
    const {userId} = req.params;
    const text = await Text.find({userId})
    if(text.length === 0){
        req.flash('error','Sorry code not found')
        res.redirect(`/text`);
    }
  
    res.render("allText",{texts:text,error,success});
}
exports.getSingleText = async(req,res)=>{
    const [error] = req.flash('error');
    const [success] = req.flash('success');
    const id = req.params.id;
    const text = await Text.findById(id);
    req.flash('success',"single code fetched");
    res.render('singleText',{text,error,success});
}

exports.deleteText = async(req,res)=>{
    const ipAddress = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.ip;
    const {id} = req.params;
    const text =await Text.findById(id);
    if(!text){
        req.flash('error',"no text found")
        res.redirect(`/text/`)
       }
       if(ipAddress == text.ipAddress){
        await Text.findByIdAndDelete(id);
        req.flash("success","deleted successfully")
        res.redirect(`/code/${text.userId}`)
        }else{
        req.flash('error',"you are not authorized");
        res.redirect(`/code/${text.userId}`)
        }
}

//search by userId
exports.handleSearch = async(req,res)=>{
    const {id} = req.params
    if(!id){
        req.flash('error',"please Enter the field")
        res.redirect(`/`)
    }
    const text = await Text.find({userId:id})
    if(!text){
        req.flash('error',"code not found")
        res.redirect(`/`)
    }
    req.flash("success","Item Searched");
    res.redirect(`/code/${id}`);
}