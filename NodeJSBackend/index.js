const router = module.exports = require('express').Router();

router.use('/', require('./home'));
router.use('/sites', require('./sites'));
router.use('/user', require('./users'));
router.use('/testuser', require('./testusers'));