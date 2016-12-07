// Environment settings
require('dotenv').config();

// Import modules
var express = require('express');
var ejs = require('ejs');
// var history = require('connect-history-api-fallback');

var birds = require('./birds');

// Instantiate imported modules
var app = express();

// Middlewares
app.use(express.static('public'));
app.use('/birds', birds);

// Error handlers

// Set templating engine
app.set('view engine', 'ejs');
app.set('views', './resources/views/content');

// Export app
module.exports = app;
