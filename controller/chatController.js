const Chat = require("../model/chatModel");
const { normalizeIp } = require("../utils/normalizeIp");

exports.chat = async(req,res)=>{
    const msg = await Chat.find();
    let clientIp = req.connection.remoteAddress;// req.headers['x-forwarded-for'] ||
    clientIp = normalizeIp(clientIp);
    const [error] = req.flash('error');
    const [success] = req.flash('success');
    res.render("chat",{msgg:msg, clientIp,error,success})
}