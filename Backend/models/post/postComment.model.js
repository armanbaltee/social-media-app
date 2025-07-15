const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true
  },
  commentByID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  commentMsg: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);
