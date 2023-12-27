const express=require("express")
const {userdata,LoginUser}= require("../controllers/Auth")

const app=express.Router()

app.post("/Register",userdata)
app.post("/Login",LoginUser)



module.exports=app