const express = require("express");
const routes = express.Router();
const authMiddleware = require("../middleware/auth.middleware")
const userFriendListController = require("../controllers/User/userFriend.controller")

routes.get('/getfriend', authMiddleware.verifyToken, userFriendListController.getAllUser)

module.exports = routes