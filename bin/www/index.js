// Import modules
var app = require('../../app/app.js');

// Routes
app.get('/', function (req, res) {
  res.render('index', { pageTitle: 'halo' });
});

app.get('/users/:usersId/books/:bookId', function (req, res) {
  /*
   *  URL with /users/1/books/2 will return this
   *  { "usersId": "1", "bookId": "2" }
   *  Notice the quotes, it is considered as a string
   *
   */
  res.send(req.params);
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

app.use(function (req, res, next) {
  res.render('index', { pageTitle: 'halo2' });
});

// Port listen
app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
