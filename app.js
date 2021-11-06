const express = require('express');
const mongoose = require('mongoose');
const pageRout = require('./routes/pageRout');
const courseRout = require('./routes/courseRout');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

const app = express();

//Connect DataBase
mongoose.connect('mongodb://localhost/smart-education-db')
.then(() => {
  console.log('DB connected successfully');
}).catch((err) => {
  console.log(err);
})

//Template Engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


//Routes
app.use('/', pageRout);
app.use('/courses', courseRout);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);



const port = 3000;

app.listen(port, () => {
  console.log(`App started on port ${port}.`);
});
