const mongoose = require("mongoose");

const friendListSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    friendByID: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }]
});


module.exports = mongoose.model('FriendList', friendListSchema)