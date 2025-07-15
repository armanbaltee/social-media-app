const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    description: {
        type: String,
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    isTrash:{
        type:Boolean,
        default:false
    },
    mediaPaths: [{ 
        type: String, 
    }],
    userID: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    likedByID: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }]
},{timestamps: true})

module.exports = mongoose.model('Post', postSchema);