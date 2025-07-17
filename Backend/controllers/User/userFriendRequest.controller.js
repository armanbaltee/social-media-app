const FriendRequest = require('../../models/user/userFriendRequest.model');
const User = require('../../models/user/user.model')

const getFriendRequest = async (req, res)=>{
    try {
        const userId = req.user.id
        const requestList = await FriendRequest.find().populate('sender', 'name', 'User');
        const filterRequest = requestList.filter(u => u.receiver.toString() == userId)
        if(!filterRequest){
            return res.status(500).json({message: "No request found"});
        }
        return res.status(200).json({list: filterRequest, message: "Successfully fetch request"});
    } catch (error) {
        return res.status(500).json({message: "Server error", err: error.message})
    }
}

module.exports = {
    getFriendRequest
}