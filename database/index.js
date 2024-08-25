const ConnectionString = "mongodb+srv://aashisrijal252:aashishrijal123@sathishare.cmqyb.mongodb.net/?retryWrites=true&w=majority&appName=sathiShare";
const mongoose = require('mongoose');

async function connectToDatabase(){
    try{
    await mongoose.connect(ConnectionString);
    console.log("Database Connected successfully");
    }
    catch(err){
        console.log("Error in connecting to database",err);
    }
}

module.exports = connectToDatabase;