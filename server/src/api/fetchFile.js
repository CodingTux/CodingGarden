const express = require('express');
const UserModel = require("../db/models/users.models")
const router = express.Router();

const UserHandler = require("../db/handlers/users")

const User = new UserHandler(UserModel)

router.get('/:userId', async (req, res) => {
  try{
    const files = await User.fetchFiles(req.params.userId)
    res.json({"Files": files});
  }catch(err){
    res.json({
      "Error": "INTERNAL_SERVER_ERROR"
    })
  }
});

module.exports = router;
