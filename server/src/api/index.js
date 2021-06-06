const express = require('express');

const fetchFile = require('./fetchFile');
const uploadFile = require('./uploadFile');
const registerUser = require('./register');

const router = express.Router();

router.use('/fetch', fetchFile);
router.use('/upload', uploadFile);
router.use('/register', registerUser);

module.exports = router;
