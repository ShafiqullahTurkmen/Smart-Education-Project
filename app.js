const express = require('express');
const pageRouter = require('./routes/pageRouter');

const app = express();

//Template Engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));

//Routes
app.use('/', pageRouter);



const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}.`);
});
