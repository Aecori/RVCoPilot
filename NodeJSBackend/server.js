const express = require('express');
const app = express();
app.enable('trust proxy');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const { auth } = require('express-openid-connect');
const { config } = require('./auth');
app.use(auth(config));

app.use('/', require('./index'));

// Error handling
app.use(function(err, req, res, next) {
  if (err.name === 'No JWT' || err.name === 'UnauthorizedError') {
      res.status(401).json({'Error': 'Invalid or missing JWT.'})
  } else {
      next(err);
  }
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});