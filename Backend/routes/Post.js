const express=require("express")
const { createPost, UpdatePost, DeletePost, getMyPosts, singlePost } = require("../controllers/Post")
const { GetSingleUser } = require("../controllers/User")
const app=express.Router()
app.post("/create/:id",createPost)
app.put("/update/:id/:porductId",UpdatePost)
app.delete("/delete/:id/:porductId",DeletePost)
app.post("/getmypost/:id",getMyPosts)
app.get("/",getMyPosts)
app.get("/:id",singlePost)


module.exports=app