const express = require('express');
const routes = express.Router();
const middleware = require("../middleware/auth.middleware")
const postController = require('../controllers/post/post.controller')

routes.post('/upload', middleware.verifyToken, postController.uploadPost)
routes.get('/getpost', postController.getPostData);
routes.delete('/delete/:id', postController.deletePostData);
routes.patch('/liked/:id', middleware.verifyToken, postController.postLiked)

module.exports = routes