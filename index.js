//-----------------------------SETUP-------------------------------------//

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const urlRouter = require('./Routing/urlRouter')

// Mongoose connection and error handling
mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection error:"));

// configure port
const port = process.env.PORT || 5001;

// middleware
app.use(cors()); // for for external freeCodeCamp testing
app.use('/public', express.static(`${process.cwd()}/public`)); // CSS
app.use(express.urlencoded({ extended: false })) // form to json
app.use(express.json()) //form to json
app.use('/api/shorturl', urlRouter)

// endpoints
app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// listen here
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
