const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const dotenv = require('dotenv');
dotenv.config();
const connectToDatabase = require('./database/index.js');
connectToDatabase();

app.set("view engine", "ejs");
// Enable trusting proxy headers
app.set('trust proxy', true);
// to perform with file search delete 
const fs = require('fs');
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
  res.render('home.ejs')
})



// require database table to access in this project 
const Chat = require('./model/chatModel.js');
const Text = require('./model/textModel.js');
const File = require('./route/fileRoute.js');


const chatRoute = require('./route/chatRoute.js')
const fileRoute = require('./route/fileRoute.js')
const textRoute = require('./route/textRoute.js')

app.use("",chatRoute);
app.use("",fileRoute);
app.use("",textRoute);

const jwt = require("jsonwebtoken")
//give access the css folder to the node js 
app.use(express.static('public/'));
app.use('/storage', express.static(path.join(__dirname, 'storage')));
app.use(express.static('storage/'))

const socketio = require('socket.io');
const flash = require('connect-flash')
const session = require("express-session")
app.use(session({
  secret: "aashishrijal",
  resave: false,
  saveUninitialized: false
}))
app.use(flash());



// require bcrypt which is used to hashed the password (bcrypt.hashSync(password,10))
const bcrypt = require('bcrypt');
const cookies = require('cookie-parser');
const { promisify } = require("util");
app.use(cookies())



// 404 Error Page
app.use((req, res, next) => {
  res.status(404).render('404.ejs');
});
// app.use(async (req,res,next)=>{
//     const token =  req.cookies.jwtToken 
//    try {
//      const decryptedResult =  await promisify(jwt.verify)(token,'aashish')
//      const data = await users.findByPk(decryptedResult.id)
//      res.locals.userName = data.username 
//    } catch (error) {
//      res.locals.isAuthenticated = false 
//    }
//     next()
//  })

 app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});







//allocate port number to the server 
const server = app.listen(port,()=>{
    console.log(`project has started at port ${port}`);
})

const io = socketio(server,{
  cors:{
    origin: "*"
  }
})

io.on('connection',(socket)=>{
    console.log("user Connected",socket.id);
    // store in jesonwebtoken of the user address and id
    socket.on('disconnect',()=>{
        console.log("user Disconnected",socket.id);
        })
        
})

