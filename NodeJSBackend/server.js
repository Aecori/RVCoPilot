const express = require('express');
const app = express();
const ds = require('./datastore');

const datastore = ds.datastore;
app.use(express.json());

app.use('/', require('./index'));

// Error handling for general server errors
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});