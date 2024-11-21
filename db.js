const mongoose = require("mongoose");
require('dotenv').config();

 const mongoURL = process.env.DB_URL;

 mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,

});

const db = mongoose.connection;

db.on('connected',()=>{
   console.log('Connected to mongodb server');
});

db.on('discconnected',()=>{
    console.log('Mongodb discconnected');
 });

 db.on('error',(err)=>{
    console.log('Mongodb connection error');
 });

module.exports ={
    db
}