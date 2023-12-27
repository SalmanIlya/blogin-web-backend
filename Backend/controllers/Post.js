const Post = require("../modules/Post");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dwqy2hryf",
  api_key: "547653322189639",
  api_secret: "USoPYrz3jSUU1G5NMkHVUfMWiS8",
});

// createPost
const createPost = async (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  console.log(req.body.UserId);
  if (req.body.UserId == req.params.id) {
    const image=req.files.img;
    const uploadimage=await cloudinary.uploader.upload(image.tempFilePath)
    const postdata = new Post({
      UserId:req.body.UserId,
      title:req.body.title,
      desc:req.body.desc,
      img:uploadimage.secure_url,
    });
    try {
      console.log(req.body);
      const post = await postdata.save();
      res.status(200).json({
        success: true,
        post,
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        err,
      });
    }
  } else {
    res.status(404).json({
      success: false,
      massage: "you are not allow to use some 1 else account",
    });
  }
};
// update post
const UpdatePost = async (req, res) => {
  try {
    if (req.body.UserId === req.params.id) {
      const Updatepost = await Post.findByIdAndUpdate(
        req.params.porductId,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json({
        success: true,
        massage: "",
        Updatepost,
      });
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      massage: "you are not allow to use some 1 else account",
      err,
    });
  }
};
// delete post 
const DeletePost = async (req, res) => {
  try {
    if (req.body.UserId === req.params.id) {
      const deletepost = await Post.findByIdAndDelete(req.params.porductId);
      res.status(200).json({
        success: true,
        massage: "post has been deleted",
      });
    } else {
      res.status(404).json({
        success: false,
        massage: "you are not allow to use some 1 else account",
      });
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      massage: "you are not allow to use some 1 else account",
    });
  }
};


// get only my  all posts
const getMyPosts = async (req, res) => {
  const post=await Post.find()
  res.status(202).json(post)
};
const singlePost=async(req,res)=>{
  const post=  await Post.findById(req.params.id)
  res.status(202).json(post)
}

module.exports = { createPost, UpdatePost, DeletePost, getMyPosts,singlePost };