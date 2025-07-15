const User = require("../../models/user/user.model")
const FriendList = require('../../models/user/userFriendList.model')
const FriendRequest = require('../../models/user/userFriendRequest.model');


const getAllUser = async (req, res)=>{
    try {
        const allUser = await User.find();

    if (!allUser || allUser.length === 0) {
        return res.status(404).json({ message: "No users found" });
    }

    const activeUserID = req.user.id;

    users = allUser.filter(u => u._id.toString() !== activeUserID)

    return res.status(200).json({ users: users });
    } catch (error) {
        console.error("Error in getAllUser:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    getAllUser
}