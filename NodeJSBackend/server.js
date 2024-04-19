const express = require('express');
const app = express();
const ds = require('./datastore');

const datastore = ds.datastore;
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

 // Listen to the App Engine-specified port, or 8080 otherwise
 const PORT = process.env.PORT || 8080;

 app.listen(PORT, () => {
   console.log(`Server listening on port ${PORT}...`);
 });