const jwt=require('jsonwebtoken');
const User=require('../models/userModel');

exports.protect=async(req,res,next)=>{
    let token;

    if(req.headers.authorisation&&req.headers.authorisation.startsWith("Bearer")){
        token=req.headers.authorisation.split(" ")[1]
    }
    if(!token){
        return res.json({message:"Not authorized to access this route"});
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        const user=await User.findById(decoded.id);
        if(!user){
           return res.json({message:"no User found"});
        }
       req.user=user;
    //    return req.user;
       next();

    } catch (error) {
        return res.json({message:"not authorized to access this route"});
    }
}