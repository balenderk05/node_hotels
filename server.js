const express = require('express');
const app = express();
const db = require('./db');
const Person = require('./models/Person')
const MenuItem = require('./models/MenuItem')
const bodyParser = require('body-parser');


app.use(bodyParser.json());

app.get('/', function (req, res){
    res.send('Welcome to my hotel..')
})

// import the server file
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes')


app.use('/person', personRoutes);
app.use('/menu', menuRoutes);

app.listen(3000, ()=>{
    console.log('listening on port 3000');
})
