const express = require('express');
const UserModel = require("../db/models/users.models")
const router = express.Router();

const UserHandler = require("../db/handlers/users")

const User = new UserHandler(UserModel)
router.get('/', (req, res) => {
  res.json("Nothing is here");
});

router.post('/', async (req, res) => {
    const { userId, files } = req.body
    console.log(userId, files)
    const isUploaded = await User.pushFiles(userId, files)
    console.log(isUploaded)
    res.json("Nothing is here");
});

module.exports = router;
