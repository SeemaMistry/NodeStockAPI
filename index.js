const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');

// set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// set handlebar routes
app.get('/', function (req, res) {
  res.render('home');
});

// set port to system's or 5000 default
const PORT = process.env.PORT || 5000;

// set routes
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('port is working on: ' + PORT));
