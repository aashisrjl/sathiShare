const nodemailer = require('nodemailer')
const sendEmail = async(data)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: "aashisrijal252@gmail.com",
            pass: "igxygsohyqgziafq"
        }
    })
    const mailOption={
        from :'"SathiShare" <aashisrijal252@gmail.com>',
        to: data.email,
        subject: data.subject,
        text: data.text
    }
    await transporter.sendMail(mailOption)
}
module.exports= sendEmail;