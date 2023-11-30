const mongoose = require('mongoose');

const mongourl = "mongodb://127.0.0.1:27017/?directConnection=true&tls=false";
const connectToMongo = ()=>{
    mongoose.connect(mongourl)
    .then(()=>{console.log("DB CONNECTED")})
    .catch((err)=>{console.log("error in DB" , err)})
}

module.exports = connectToMongo;