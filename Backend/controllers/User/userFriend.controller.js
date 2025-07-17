const User = require("../../models/user/user.model")
const FriendList = require('../../models/user/userFriendList.model')
const FriendRequest = require('../../models/user/userFriendRequest.model');


// const getAllUser = async (req, res)=>{
//     try {
//         const allUser = await User.find();

//     if (!allUser || allUser.length === 0) {
//         return res.status(404).json({ message: "No users found" });
//     }

//     const activeUserID = req.user.id;

//     users = allUser.filter(u => u._id.toString() !== activeUserID)

//     return res.status(200).json({ users: users });
//     } catch (error) {
//         console.error("Error in getAllUser:", error);
//         return res.status(500).json({ message: "Server error" });
//     }
// }

// const addFriend = async (req, res)=>{
//     try {
//         const senderId = req.user.id;
//         console.log("diewd", senderId)
//         const user = req.body;
//         userList = [];

//         const people = await FriendRequest.find();
//         console.log('people===', people)
//         if(!people){
//             return res.status(500).json({message: "No request found"});
//         }
//          const existingRequest = await FriendRequest.findOne({
//             sender: senderId,
//             receiver: receiverId,
//             status: 'pending'
//         });
        
//         if (existingRequest) {
//             return res.status(409).json({ message: "Friend request already sent." });
//         }
        
//         const friendRequest = new FriendRequest({
//             sender: userList,
//             receiver: user._id,
//             status: 'pending'
//         }) 
//         await friendRequest.save();
//         res.status(200).json({message: "Successfully add request", request: friendRequest});

//     } catch (error) {
//         return res.status(500).json({message: "Server error", error: error.message});
//     }
// }


const getAllUser = async (req, res) => {
  try {
    const allUser = await User.find();
    const activeUserID = req.user.id;

    const users = allUser.filter(u => u._id.toString() !== activeUserID);

    const sentRequests = await FriendRequest.find({
      sender: activeUserID,
      status: 'pending'
    }).select('receiver');

    const pendingReceiverIds = new Set(sentRequests.map(req => req.receiver.toString()));

    const result = users.map(user => ({
      ...user._doc,
      isPending: pendingReceiverIds.has(user._id.toString())
    }));

    return res.status(200).json({ users: result });
  } catch (error) {
    console.error("Error in getAllUser:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


const addFriend = async (req, res)=>{
    const receiverId = req.body._id;
    try {
        const senderId = req.user.id;
        console.log("diewd", senderId)
        const user = req.body;
        userList = [];

        const people = await FriendRequest.find();
        console.log('people===', people)
        if(!people){
            return res.status(500).json({message: "No request found"});
        }
         const existingRequest = await FriendRequest.findOne({
            sender: senderId,
            receiver: receiverId,
            status: 'pending'
        });
        
        if (existingRequest) {
            return res.status(409).json({ message: "Friend request already sent." });
        }
        
        const friendRequest = new FriendRequest({
            sender: senderId,
            receiver: receiverId,
            status: 'pending'
        }) 
        await friendRequest.save();
        res.status(200).json({message: "Successfully add request", request: friendRequest});

    } catch (error) {
        return res.status(500).json({message: "Server error", error: error.message});
    }
}

module.exports = {
    getAllUser,
    addFriend
}