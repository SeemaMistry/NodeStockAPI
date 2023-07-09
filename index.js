const express = require('express');
const { engine } = require('express-handlebars');

const app = express();
const path = require('path');

// set port to system's or 5000 default
const PORT = process.env.PORT || 5000;

// set handlebars middleware
app.engine(
  'handlebars',
  engine({
    extname: '.handlebars',
    defaultLayout: 'main',
    // layoutsDir: path.join(__dirname, 'views/layouts'),
  })
);
app.set('view engine', 'handlebars');
app.set('views', './views');

// Alpha Vantage API
// 'use strict';
var request = require('request');

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=microsoft&apikey=7NRVXF6FRD2KZPF3';

const content = { stuff: "I am displaying some stuff", content: "200 okay",
            obj: [1,2,3], obj2: [{id:"hi", "name. 1":"world"}, {id:"bye", "name. 1":"sky"}]

}

request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
      
      // add data to content{}
      content.stocks = data.bestMatches;
      
      // add only the ticker symbol to the stock{}
      data.bestMatches.forEach(stock => {
        console.log(stock['1. symbol'])
      })


    }
});
// set handlebar routes
app.get('/', function (req, res) {
   res.render('home', content );
});



// set routes
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('port is working on: ' + PORT));


