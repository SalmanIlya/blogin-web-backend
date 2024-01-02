const express=require("express")
const bodyparser=require("body-parser")
const cors=require("cors")
const db = require("./db/db")
const uploadfile=require("express-fileupload")

const app=express()
app.use(bodyparser.json()) 
app.use(bodyparser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(uploadfile({
    useTempFiles:true
}))
app.use(cors())
 

module.exports=app;