const express = require("express");
const routes = express.Router();
const authMiddleware = require("../middleware/auth.middleware")
const userCotroller = require("../controllers/User/user.controller")
const userFriendListController = require("../controllers/User/userFriend.controller")


routes.post("/signup", authMiddleware.signup, userCotroller.signup)
routes.post("/login", authMiddleware.login, userCotroller.login)

routes.get('/getfriend', authMiddleware.verifyToken, userFriendListController.getAllUser)

module.exports = routes