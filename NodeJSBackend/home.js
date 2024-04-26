const express = require('express');
const router = express.Router();
const ds = require('./datastore');
const datastore = ds.datastore;

router.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = router;