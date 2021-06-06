const express = require('express');
const UserModel = require("../db/models/users.models")
const router = express.Router();

const UserHandler = require("../db/handlers/users")

const User = new UserHandler(UserModel)

router.get('/:userId', async (req, res) => {

  try{
    const isRegistered = await User.register(req.params.userId)
    console.log(isRegistered)
    res.json({"Message": "Welcome " + req.params.userId});
  }catch(err){
      res.json({
          "Message": "INTERNAL_SERVER_ERROR"
      })
  }
});

module.exports = router;
