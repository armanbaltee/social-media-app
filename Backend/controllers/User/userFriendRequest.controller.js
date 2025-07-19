const FriendRequest = require('../../models/user/userFriendRequest.model');
const User = require('../../models/user/user.model')
const FriendList = require("../../models/user/userFriendList.model")

const getFriendRequest = async (req, res)=>{
    try {
        const userId = req.user.id
        const requestList = await FriendRequest.find({status: "pending"}).populate('sender', 'name', 'User');
        const filterRequest = requestList.filter(u => u.receiver.toString() == userId)
        if(!filterRequest){
            return res.status(500).json({message: "No request found"});
        }
        return res.status(200).json({list: filterRequest, message: "Successfully fetch request"});
    } catch (error) {
        return res.status(500).json({message: "Server error", err: error.message})
    }
}


const acceptFriendRequest = async (req, res) => {
  try {
    const userId = req.user.id; 
    const requestId = req.body.requestId;

    if (!requestId) {
      return res.status(400).json({ message: "Friend request ID is required." });
    }

    const request = await FriendRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Friend request not found." });
    }

    if (request.receiver.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized to accept this request." });
    }

    request.status = 'accepted';
    await request.save();

    const senderId = request.sender.toString();
    const receiverId = request.receiver.toString();

    await FriendList.findOneAndUpdate(
      { user: senderId },
      { $addToSet: { friendByID: receiverId } },
      { upsert: true, new: true }
    );

    await FriendList.findOneAndUpdate(
      { user: receiverId },
      { $addToSet: { friendByID: senderId } },
      { upsert: true, new: true }
    );

    return res.status(200).json({ message: "Friend request accepted successfully." });

  } catch (error) {
    console.error("Error accepting friend request:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
    getFriendRequest,
    acceptFriendRequest
}