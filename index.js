const express = require('express');
const { engine } = require('express-handlebars');
const axios = require('axios');
const rp = require('request-promise');

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


const content = { error: "", searchTerm: "ttxp"}

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${content.searchTerm}&apikey=7NRVXF6FRD2KZPF3`;

// app.post('/', function (req, res){
//   rp(url).then(result => {
//     // do something to the data
//     // console.log(JSON.stringify(result.bestMatches))
//     content.stocks = result.bestMatches
//     // res.send(JSON.stringify(result.bestMatches))


//   }).catch(err => {
//     console.log(err)
//     console.log("there was an error ^")
//   })
// });

// Want to use async/await? Add the `async` keyword to your outer function/method.
// async function getTicker() {
//   try {
//     const response = await axios.get(url);
    
//     content.stocks = response.data.bestMatches;
//     console.log("data retrieved from axios call: ----------------")
//     console.log(content);

//   } catch (error) {
//     console.error(error);
//   }
// }
axios.get(url)
.then((res) => content.stocks = res.data.bestMatches)
.catch((err) => console.log(err))
// set handlebar routes
app.get('/', function (req, res)  {


  console.log("RIGHT BEFORE APP.GET()")
  console.log("data retrieved from get call: ----------------")
  console.log(content)
  res.render('home', content );
  // next();
});

app.post('/', async function  (req, res)  {
  // update url searchterm
  content.searchTerm = req.body.searchTerm;
  url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${content.searchTerm}&apikey=7NRVXF6FRD2KZPF3`
//   axios.get(url)
// .then((res) => {
//   content.stocks = res.data.bestMatches
//   console.log(content)
// })
// .catch((err) => console.log(err))
// // axios.get('/').then((res) => {
// //   console.log("made a get request")
// // })
// // .catch((err) => console.log(err))

try{
  const response = await axios.get(url)
  const data = await response.data.bestMatches
  console.log(data);
  content.error  = "";
  if (data.length === 0){
    content.error  = "There were no stocks that matched.\nUse the LookUp search in the top right corner to search up a ticker."
  }
  content.stocks = data;
}catch (err){
  console.log(err)
}


res.redirect('/')
});

// axios.post('/')

// app.post('*', function (req, res)  {
//   // set url
//   content.searchTerm = req.body.searchTerm;
//   url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${content.searchTerm}&apikey=7NRVXF6FRD2KZPF3`
//   getTicker();
//   console.log("POST URL")
//   res.render('home', content );
//   // next();
// });

// request.get({
//   url: url,
//   json: true,
//   headers: {'User-Agent': 'request'}
// }, (err, res, data) => {
//   if (err) {
//     console.log('Error:', err);
//     console.log(content.error)

//   } else if (res.statusCode !== 200) {
//     console.log(content.error)
//     console.log('Status:', res.statusCode);
//   } else {
//     // data is successfully parsed as a JSON object:
//     // console.log(data);

//     if (data.bestMatches.length === 0) {
//       content.error = "There were no stocks that matched.\nUse the LookUp search in the top right corner to search up a ticker."
//     }
//     content.error = ""
//     // add data to content{}
//     content.stocks = data.bestMatches;
//     // res.redirect('/')
//     // console.log("Inside the request.get() START ------------------------------")
//     // console.log( content.stocks)
//     console.log( "right before res.render")
//     // console.log("Inside the request.get() END ------------------------------")
//     res.render
//   }
// });


// set routes
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('port is working on: ' + PORT));




// app.post('/', function (req, res, next) {
//   content.searchTerm = req.body.searchTerm;
//   console.log(req.body.searchTerm) 
//     // console.log(url)
//     // console.log(res)


//   url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${req.body.searchTerm}&apikey=7NRVXF6FRD2KZPF3`;
//     console.log(url)
    
//     const reponse = await axios.get(url)

//     request.get({
//       url: url,
//       json: true,
//       headers: {'User-Agent': 'request'}
//     }, (err, res, data) => {
//       if (err) {
//         console.log('Error:', err);
//         console.log(content.error)
    
//       } else if (res.statusCode !== 200) {
//         console.log(content.error)
//         console.log('Status:', res.statusCode);
//       } else {
//         // data is successfully parsed as a JSON object:
//         // console.log(data);
    
//         if (data.bestMatches.length === 0) {
//           content.error = "There were no stocks that matched.\nUse the LookUp search in the top right corner to search up a ticker."
//         }
//         content.error = ""
//         // add data to content{}
//         content.stocks = data.bestMatches;
//         // res.redirect('/')
//         // console.log("Inside the request.get() START ------------------------------")
//         // console.log( content.stocks)
//         console.log( "right before res.render")
//         // console.log("Inside the request.get() END ------------------------------")
//         res.render
//       }
//     });
// // console.log(result)
// // console.log("OUTSIDE the request.get() START ------------------------------")
// // console.log( content.stocks)
// console.log( "right before res.render('home')")
// // return next();
// // console.log("OUTSIDE the request.get() END------------------------------")
// // res.redirect('/')
// res.render('home', content)
// // next();

// //  res.redirect('/')

// });