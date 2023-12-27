const mongoose=require("mongoose")
const db=()=>{
    mongoose.connect(process.env.db).then(()=>{
        console.log("database is connected sucessfully");
    }).catch(()=>{
        console.log("!!! database connection error");
    })
}
module.exports=db