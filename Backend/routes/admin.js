const express=require("express")
const User=require("express");
const Post=require("./Post")
const app=express.Router()
app.use("/user",User)
app.use("/post",Post)

module.exports=app