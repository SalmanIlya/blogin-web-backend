const express=require("express")
const bodyparser=require("body-parser")
const cors=require("cors")
const dotenv=require("dotenv")
const db = require("./db/db")
const Auth=require("./routes/auth")
const Admin=require("./routes/admin")
const uploadfile=require("express-fileupload")
dotenv.config({path:"config/config.env"})
const app=express()
const port =process.env.port
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(uploadfile({
    useTempFiles:true
}))
db()
app.use(cors())

app.use("/auth",Auth)
app.use("/api",Admin)
app.listen(port,()=>{
    console.log(`server is working on http://localhost:${port}`);
})