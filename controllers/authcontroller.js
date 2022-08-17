const User=require("../routes/models/userModel");
const mongoose=require('mongoose');




exports.register = async (req,res,next) =>{
    const email=req.body.email;
    const Newuser=await User.findOne({email})
    const username=req.body.username;
    const nuser=await User.findOne({username});
    if(Newuser){
      return res.status(201).json({message:"Email already registered"})
    }
    if(nuser){
        return res.status(201).json({message:"Username is taken.Please choose another username"})
    }
    const password=req.body.password;
    if(password.length<6){
       return res.status(201).json({message:"Password should be of minimum 6 digits"})
    }
    const registration=req.body.registration;
    if(registration>99999999||registration<10000000){
        return res.status(201).json({message:"registration number should be of 8 digits"})
     }
    const user=new User({
        _id: new mongoose.Types.ObjectId(),
       
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        image:req.file.filename,
        registration:req.body.registration,
        program:req.body.program        
    });
   
    user.save().then(() =>{
    
      res.json({user,
    token:sendToken(user)})

    }).catch(err=>{
        console.log(err)
        res.json({error:err});
    });


};
exports.login = async (req,res,next) =>{
    const {email,password}=req.body;
    if(!email||!password){
       return res.status(201).json({message:"please provide email and password"});
    }
    try {
        const user=await User.findOne({email}).select("password");
        if(!user){
           return res.status(201).json({message:"Invalid email"});
        }
        const isMatch=await user.matchPasswords(password);

        if(!isMatch){
           return res.status(201).json({message:"Invalid password"})
        }

       return res.json({user,
        token:sendToken(user)})


    } catch (error) {
       res.status(404).json({error:error}); 
    }

};
const sendToken=(user) =>{
    const token = user.getSignedToken();
   return token;
}