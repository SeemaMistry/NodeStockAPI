const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
// const exphbs = require('express-handlebars');
const path = require('path');

// set port to system's or 5000 default
const PORT = process.env.PORT || 5000;

// set handlebars middleware
app.engine(
  'handlebars',
  engine({ extname: '.handlebars', defaultLayout: 'main' })
);
app.set('view engine', 'handlebars');
app.set('views', './views');

// set handlebar routes
app.get('/', function (req, res) {
  res.render('home');
});

// set routes
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('port is working on: ' + PORT));
