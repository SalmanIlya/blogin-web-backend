const app = require("./app");
const Auth=require("./routes/auth")
const Admin=require("./routes/admin")
const dotenv=require("dotenv");
const db = require("./db/db");
const port =process.env.port

dotenv.config({path:"config/config.env"})
db ()

app.use("/auth",Auth)
app.use("/api",Admin)
app.get("/",(req,res)=>{
    res.send("working")
})
app.listen(port,()=>{
    console.log(`server is working on http://localhost:${port}`);
})