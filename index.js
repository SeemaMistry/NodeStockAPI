const express = require('express');
const app = express();
const path = require('path');

// set port to system's or 5000 default
const PORT = process.env.PORT || 5000;

// set routes
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('port is working on: ' + PORT));
