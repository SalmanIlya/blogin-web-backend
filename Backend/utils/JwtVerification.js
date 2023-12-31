const jwt=require("jsonwebtoken");
const secritkey=process.env.secritkey
module.exports=  verifyuser=(req,res,next)=>{
    const token=req.headers.token
    if(token || token.startsWith("Bearer")){
        const user=token.split(" ")[1]
        jwt.verify(user,secritkey,(err,user)=>{
            if(err){
                console.log(err);
                return ;
            }else{
                next()
                return user
            }
        })
    }
}