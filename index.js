const app = require('./app');
// set port to system's or 5000 default
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('port is working on: ' + PORT));


// testing with supertest and jest
