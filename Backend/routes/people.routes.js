const express = require("express");
const routes = express.Router();
const authMiddleware = require("../middleware/auth.middleware")
const userFriendListController = require("../controllers/User/userFriend.controller");
const requestController = require('../controllers/User/userFriendRequest.controller');

routes.get('/getfriend', authMiddleware.verifyToken, userFriendListController.getAllUser);
routes.post('/addfriend', authMiddleware.verifyToken, userFriendListController.addFriend);
routes.get('/request', authMiddleware.verifyToken ,requestController.getFriendRequest);

module.exports = routes