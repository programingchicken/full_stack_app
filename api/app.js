'use strict';

// load modules

const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const bodyParser = require('body-parser')
const {sequelize} = require('./models');
const routes = require('./routes')

// const sequelize = require('./public/db/database.js');



//// const indexRoute = require('./public/routes/Book')

//Update database

// create the Express app
const app = express();


app.set('views', __dirname + '/views');
app.set('view engine', 'pug');


app.use(express.static(__dirname + '/seed'));
app.use(bodyParser.json())
app.use(express.urlencoded({ extend: false }));
app.use(/*this is middle ware*/express.json());


sequelize.authenticate(console.log('db is running'))
sequelize.sync({ /*Use to force the sync on database*/ force: true}).then(() => console.log('db is ready'))
// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';




// Setup morgan which gives us HTTP request logging.
app.use(morgan('dev'));

// Enable All CORS Requests
app.use(cors());

app.use('/api', routes);    
// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// Send 404 if no other route matched.
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// Setup a global error handler.
app.use((err, req, res, next) => {
  console.error(`Global error handler: ${JSON.stringify(err.stack)}`);

  res.status(500).json({
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err,
  });
});

// set our port
app.set('port', process.env.PORT || 8045);



// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
