const express = require('express');
const { engine } = require('express-handlebars');
const axios = require('axios');

const app = express();
const path = require('path');

const {API_KEY} = require('./apiKey');

// bodyparser middleware
app.use(express.json())
app.use(express.urlencoded());



// set handlebars middleware
app.engine(
  'handlebars',
  engine({
    extname: '.handlebars',
    defaultLayout: 'main',
  })
);
app.set('view engine', 'handlebars');
app.set('views', './views');

// store data state in content object
const content = { error: "", searchTerm: "ttxp"}

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${content.searchTerm}&apikey=${API_KEY}`;

// default auto load TTXP ticker for homepage
axios.get(url)
.then((res) => content.stocks = res.data.bestMatches)
.catch((err) => console.log(err))

// set handlebar routes
app.get('/', function (req, res)  {
  res.render('home', content);
});

app.post('/', async function  (req, res)  {
  // update url searchterm
  content.searchTerm = req.body.searchTerm;
   // put gibberish in searchTerm if empty
  if (req.body.searchTerm === ""){
    content.searchTerm = "sgsugjosdifg"
  }
  url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${content.searchTerm}&apikey=${API_KEY}`
  
  // load data in content.stocks before rendering web-page
  try{
  // get stock ticker data
  const response = await axios.get(url)
  const data = await response.data.bestMatches
  
  // add err msg if no stock ticker data found
  content.error  = "";
  if (data.length === 0){
    content.error  = "There were no stocks that matched.\nUse the LookUp search in the top right corner to search up a ticker."
  }
  // set data
  content.stocks = data;
}catch (err){
  console.log(err)
}

// render data on home 
res.redirect('/')
});

// set routes
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app