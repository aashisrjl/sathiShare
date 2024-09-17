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
// Middleware to get the client's IP address
const requestIp = require('request-ip');
app.use(requestIp.mw());

const fs = require('fs');
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//messages
const flash = require('connect-flash')
const session = require("express-session")
app.use(session({
  secret: "aashishrijal",
  resave: false,
  saveUninitialized: false
}))
app.use(flash());
app.get('/',(req,res)=>{
  const [error] = req.flash('error');
  const [success] = req.flash('success');
  res.render('home.ejs',{error,success})
})



// require database table to access in this project 
const Chat = require('./model/chatModel.js');
const Text = require('./model/textModel.js');
const File = require('./model/fileModel.js');


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




// require bcrypt which is used to hashed the password (bcrypt.hashSync(password,10))
const bcrypt = require('bcrypt');
const cookies = require('cookie-parser');
const { promisify } = require("util");
app.use(cookies())



// 404 Error Page
app.use((req, res, next) => {
  res.status(404).render('404.ejs');
});


//  app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something went wrong!');
// });


//allocate port number to the server 
const server = app.listen(port,()=>{
    console.log(`project has started at port ${port}`);
})

// const io = socketio(server,{
//   cors:{
//     origin: "*"
//   }
// })
const io = socketio(server);

io.on('connection', (socket) => {

  let clientIp = socket.request.connection.remoteAddress;//socket.handshake.headers['x-forwarded-for'] || 
  clientIp = normalizeIp(clientIp);

  socket.on('message', async (msg) => {
    msg.ipAddress = clientIp;
    msg.socketId = socket.id; 

    console.log(msg); 
    await Chat.create({
      ipAddress: msg.ipAddress,
      message: msg.message,
      userName: msg.userName,
      socketId: msg.socketId
    });

    io.emit('broadcast', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
// deletes msg after create 10min
const cron = require('node-cron');
const { normalizeIp } = require("./utils/normalizeIp.js");

//delete chat
cron.schedule('* * * * *', async () => {
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

  try {
    const result = await Chat.deleteMany({
      createdAt: { $lt: tenMinutesAgo }
    });
    console.log(`${result.deletedCount} messages deleted successfully.`);
  } catch (error) {
    console.error('Error deleting old messages:', error);
  }
});

//delete file
cron.schedule('* * * * *', async () => {
  const tenMinutesAgo = new Date(Date.now() - 24 *60 * 60 * 1000);

  try {
    const result = await File.deleteMany({
      createdAt: { $lt: tenMinutesAgo }
    });

  } catch (error) {
    console.error('Error deleting old file:', error);
  }
});

//delete text
cron.schedule('* * * * *', async () => {
  const tenMinutesAgo = new Date(Date.now() - 24 *60 * 60 * 1000 *7);

  try {
    const result = await Text.deleteMany({
      createdAt: { $lt: tenMinutesAgo }
    });
  } catch (error) {
    console.error('Error deleting old text:', error);
  }
});

