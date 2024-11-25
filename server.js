const express = require('express');
const app = express();
const db = require('./db');
const Person = require('./models/Person')
const MenuItem = require('./models/MenuItem')
const bodyParser = require('body-parser');
const passport =require('./auth')
require('dotenv').config();

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

//Middleware function
const logRequest= (req, res, next)=>{
    console.log(`[${new Date().toLocaleString()}] Request made to ${req.originalUrl}`);
    // console.log(`Request received at ${new Date().toLocaleString()}`);
    next();  
}

app.use(passport.initialize());
app.use(logRequest);

// Middleware
const localAuthMiddleware = passport.authenticate('local', {session: false})
app.get('/', function (req, res){
    res.send('Welcome to my hotel..')
})

// import the server file
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes')


app.use('/person' , personRoutes);
app.use('/menu', menuRoutes);



app.listen(3000, ()=>{
    console.log('listening on port 3000');
}) ;