const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/apiproject');

const app = express();

app.use(helmet);
// Routes
const users = require('./routes/users');
const cars = require('./routes/cars');

//Middlewares
app.use(logger('dev'));

//add body parser
app.use(bodyParser.json());

app.use('/users', users);
app.use('/cars', cars);

//Routes
app.get('/', (req, res,next) =>{
    res.status(200).json({
        message : 'you requested index page'
    })
});

//Catch 404 errors forward them to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});


//Error Handller
app.use((err, req, res, next) =>{
    const error = app.get('env') === 'development' ? err : {} ;
    const status = err.status || 500;

    //response to client
    res.status(500).json({
        error:{
            message : error.message
        }
    })

    //response to ourselves
    console.error(err);
});



//Start the server
const port = app.get('port') || 3000;
app.listen(port, () => console.log(`Server is listening to port ${port}`));




