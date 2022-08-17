const express=require('express');
const mongoose=require('mongoose');
const givetoyrouter=express.Router();
const {protect}=require('../middleware/authmiddleware');
const multer=require('multer');
const path=require('path');
const storage=multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,"toyUploads")
    },
    filename:(req,file,cb) =>{
        cb(null, Date.now()+path.extname(file.originalname))
    }
})

const Toy=require('../models/toyModel');
const User=require('../models/userModel')
const jwt=require("jsonwebtoken");
const upload=multer({storage:storage});


givetoyrouter.post('/play',protect,upload.single('image'),(req,res,next)=>{
    
    const  token=req.headers.authorisation.split(" ")[1]
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
     User.findById(decoded.id).exec()
     .then(doc =>{
        const toy= new Toy({
            _id:new mongoose.Types.ObjectId(),
            type:'Toy',
            name:req.body.name,
            image:req.file.filename,
            giver:doc.username
        });
        toy.save().then(result=>{
            console.log(result);
            res.json({
                message:"Donate toys here",
                "toy details":toy
            });
    
        }).catch(err=>{
            console.log(err);
            res.json({error:err});
        });
     })
     .catch(err =>{
         console.log(err);
        
     })
    // const toy= new Toy({
    //     _id:new mongoose.Types.ObjectId(),
    //     type:'Toy',
    //     name:req.body.name,
    //     image:req.file.filename
    // });
    // toy.save().then(result=>{
    //     console.log(result);
    //     res.json({
    //         message:"Donate toys here",
    //         "toy details":toy
    //     });

    // }).catch(err=>{
    //     console.log(err);
    //     res.json({error:err});
    // });
   
});






module.exports = givetoyrouter;