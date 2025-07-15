const Post = require("../../models/post/post.model");
const multer = require("multer");
const path = require('path')

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage }).array("media", 10);

const uploadPost = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: "Upload error", error: err.message });
    }

    const description = req.body.description;
    const files = req.files;

    if (!description || !files || files.length === 0) {
      return res.status(400).json({ message: "Description and image are required" });
    }


    try {
      const filePaths = files.map(file => file.path);

      const post = new Post({
        description,
        mediaPaths: filePaths,
        userID: req.user?.id
      });

      await post.save();
      res.status(201).json({ message: "Post uploaded successfully", post });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error: error.message });
    }
  });
};


const getPostData = async (req, res)=>{
    try {
        const posts = await Post.find({isTrash: false}).populate('userID', 'name email createdAt', 'User').sort({ createdAt: -1 })
        if(!posts){
            return res.status(401).json({message: "No Data Found in your feeds"});
        }
        let viewModel =[]
        posts.map((post)=>{

          let viewModelData={
            id: post._id,
            desc: post.description,
            mediaPaths: post.mediaPaths,
            userID: post.userID,
            likeCount: post.likedByID.length,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt
          }
          viewModel.push(viewModelData)
        })
        // console.log(viewModel);

        res.status(200).json({message: "Posts Loaded", viewModel})
    } catch (error) {
        res.status(401).json({message: "Error loading/getting data.", error: error.message})
    }
}

const deletePostData = async (req, res)=>{
  const id = req.params.id
  try {
    const postDelete = await Post.findById(id);
    if(!postDelete){
      return res.status(401).json({message: "No such post found"});
    }
    postDelete.isTrash = true
    // await Post.deleteOne({ _id: id });
    await postDelete.save();
    res.status(200).json({message: "Post delete successfully!"})
  } catch (error) {
    return res.status(401).json({message: "Error in deleting", error: error.message})
  }

}

const postLiked = async (req, res)=>{
  const {id: postId } = req.params;
  const userID = req.body.userId;
  // console.log("post id--->", postId);
  // console.log("user id--->", userID);
  try {
    const post = await Post.findById(postId);
    if(!post){
      return res.status(400).json({message: "Post Not Found"});
    }
    const alreadyLiked = post.likedByID.includes(userID);
    if(alreadyLiked){
      await Post.updateOne({_id: postId}, {$pull: {likedByID: userID}});
      return res.status(200).json({message: "Liked removed successfully"});
    }else{
      await Post.updateOne({_id: postId}, { $addToSet: { likedByID: userID}});
      return res.status(200).json({message: "Post liked"});
    }
  } catch (error) {
    res.status(401).json({message: "Post cannot be liked!"})
  }
}

module.exports = {
  uploadPost,
  getPostData,
  deletePostData,
  postLiked
};
