const express = require('express');
const mongoose = require('mongoose');
const pageRouter = require('./routes/pageRout');
const courseRouter = require('./routes/courseRout');

const app = express();

//Connect DataBase
mongoose.connect('mongodb://localhost/smart-education-db');

//Template Engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


//Routes
app.use('/', pageRouter);
app.use('/courses', courseRouter);



const port = 3000;

app.listen(port, () => {
  console.log(`App started on port ${port}.`);
});
