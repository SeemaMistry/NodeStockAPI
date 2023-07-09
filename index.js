const express = require('express');
const { engine } = require('express-handlebars');

const app = express();
const path = require('path');
var request = require('request');


// bodyparser middleware
app.use(express.json())
app.use(express.urlencoded());

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

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=microsoft&apikey=7NRVXF6FRD2KZPF3`;


const content = { error: "", searchTerm: "fb"}



app.post('/', function (req, res) {
  content.searchTerm = req.body.searchTerm;
  console.log(req.body.searchTerm)
    console.log(url)


  url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${req.body.searchTerm}&apikey=7NRVXF6FRD2KZPF3`;
    console.log(url)



  request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
      console.log(content.error)

    } else if (res.statusCode !== 200) {
      console.log(content.error)
      console.log('Status:', res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      // console.log(data);

      if (data.bestMatches.length === 0) {
        content.error = "There were no stocks that matched.\nUse the LookUp search in the top right corner to search up a ticker."
      }
      content.error = ""
      // add data to content{}
      content.stocks = data.bestMatches;
      
    }
});


// res.redirect('/')
 res.render('home', content );
});

// set handlebar routes
app.get('/', function (req, res) {
  
  res.render('home', content );
});




// Alpha Vantage API
// let url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${content.searchTerm}&apikey=7NRVXF6FRD2KZPF3`;

// request.get({
//   url: url,
//   json: true,
//   headers: {'User-Agent': 'request'}
// }, (err, res, data) => {
//   if (err) {
//     content['error'] = "There were no stocks that matched.\nUse the LookUp search in the top right corner to search up a ticker."

//     console.log('Error:', err);
//     console.log(content.error)

//   } else if (res.statusCode !== 200) {
//     content.error = "There were no stocks that matched.\nUse the LookUp search in the top right corner to search up a ticker."
//     console.log(content.error)
//     console.log('Status:', res.statusCode);
//   } else {
//     // data is successfully parsed as a JSON object:
//     console.log(data);

//     if (data.bestMatches.length === 0) {
//       content.error = "There were no stocks that matched.\nUse the LookUp search in the top right corner to search up a ticker."
//     }
//     content.error = ""

//     // add data to content{}
//     content.stocks = data.bestMatches;
    
//     // add only the ticker symbol to the stock{}
//     data.bestMatches.forEach(stock => {
//       console.log(stock['1. symbol'])
//     })


//   }
// });




// set routes
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('port is working on: ' + PORT));


