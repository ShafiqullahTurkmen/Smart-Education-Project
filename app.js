//Imports
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const pageRout = require('./routes/pageRout');
const courseRout = require('./routes/courseRout');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

//Initializes express js
const app = express();

//Connects to DataBase
mongoose
    .connect('mongodb+srv://shafiqullahturkmen:t9iXrBCH8P48hocu@cluster0.umemf.mongodb.net/smart-education-db?retryWrites=true&w=majority')
    .then(() => {
        console.log('DB connected successfully');
    })
    .catch((err) => {
        console.log(err);
    });

//Template Engine
app.set('view engine', 'ejs');

//Global Variable
global.userIN = null;

//Middlewares
app.use(express.static('public'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(session({
        secret: 'my_keyboard_cat',
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: 'mongodb+srv://shafiqullahturkmen:t9iXrBCH8P48hocu@cluster0.umemf.mongodb.net/smart-education-db?retryWrites=true&w=majority',
        }),
    })
);
app.use(flash());
app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});
app.use(
    methodOverride('_method', {
        methods: ['POST', 'GET'],
    })
);

//All Routers
app.use('*', (req, res, next) => {
    userIN = req.session.userID;
    next();
});
app.use('/', pageRout);
app.use('/courses', courseRout);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

//Port number
const port = process.env.PORT || 3000;

//listens to port
app.listen(port, () => {
    console.log(`App started on port ${port}.`);
});
