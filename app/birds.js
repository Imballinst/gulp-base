// Import expressJS
var express = require('express');
var birds = express.Router();

// Middlewares
birds.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
birds.get('/', function (req, res) {
  res.send('Birds home page');
});
birds.get('/about', function (req, res) {
  res.send('BIRDS IN 2016 LUL');
});

// Export app
module.exports = birds;
