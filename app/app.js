// Import expressJS
var express = require('express');
var ejs = require('ejs');

var birds = require('./birds');

// Instantiate imported modules
var app = express();

// Middlewares
app.use(express.static('public'));
app.use('/birds', birds);

// Set templating engine
app.set('view engine', 'ejs');
app.set('views', './resources/views/content');

// Export app
module.exports = app;
