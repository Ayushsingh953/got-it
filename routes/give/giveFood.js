const express=require('express');
const mongoose=require('mongoose');
const givefoodrouter=express.Router();
const {protect}=require('../middleware/authmiddleware');
const multer=require('multer');
const path=require('path');
const storage=multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,"foodUploads")
    },
    filename:(req,file,cb) =>{
        cb(null, Date.now()+path.extname(file.originalname))
    }
})

const Food=require('../models/foodModel');
const User=require('../models/userModel')
const jwt=require("jsonwebtoken");
const upload=multer({storage:storage});

givefoodrouter.post('/food',protect,upload.single('image'),(req,res,next)=>{
    
    const  token=req.headers.authorisation.split(" ")[1]
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
     User.findById(decoded.id).exec()
     .then(doc =>{
        const food= new Food({
            _id:new mongoose.Types.ObjectId(),
            type:'Food',
            name:req.body.name,
            quantity:req.body.quantity,
            expiry:req.body.expiry,
            image:req.file.filename,
            giver:doc.username
        });
        food.save().then(result=>{
            console.log(result);
            res.json({
                message:"Donate foods here",
                "food details":food
            });
    
        }).catch(err=>{
            console.log(err);
            res.json({error:err});
        });
     })
     .catch(err =>{
         console.log(err);
         
     })
    // const food= new Food({
    //     _id:new mongoose.Types.ObjectId(),
    //     type:'Food',
    //     name:req.body.name,
    //     quantity:req.body.quantity,
    //     expiry:req.body.expiry,
    //     image:req.file.filename
    // });
    // food.save().then(result=>{
    //     console.log(result);
    //     res.json({
    //         message:"Donate foods here",
    //         "food details":food
    //     });

    // }).catch(err=>{
    //     console.log(err);
    //     res.json({error:err});
    // });
    
});






module.exports = givefoodrouter;