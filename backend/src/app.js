const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler');



const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


//routes
app.use('/api', routes);

//404
app.use((req,res,next)=> res.status(404).json({ message: 'Not Found'}));

app.use(errorHandler);

module.exports = app;