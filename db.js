const mongoose = require("mongoose");
const mongoURL = 'mongodb://localhost:27017/hotels'

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