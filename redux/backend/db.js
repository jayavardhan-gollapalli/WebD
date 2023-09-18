const mongoose = require('mongoose');
const mongoURI= "mongodb://localhost:27017/inotes"
const connectToMongo= async ()=>{
    await mongoose.connect(mongoURI);
    console.log("Connected to Mongo")
}
module.exports = connectToMongo;

