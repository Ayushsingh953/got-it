const express=require('express');
const mongoose=require('mongoose');
const givemedrouter=express.Router();
const {protect}=require('../middleware/authmiddleware');
const multer=require('multer');
const path=require('path');
const storage=multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,"medUploads")
    },
    filename:(req,file,cb) =>{
        cb(null, Date.now()+path.extname(file.originalname))
    }
})

const Med=require('../models/medModel');
const User=require('../models/userModel')
const jwt=require("jsonwebtoken");
const upload=multer({storage:storage});

givemedrouter.post('/heal',protect,upload.single('image'),(req,res,next)=>{
    
    const  token=req.headers.authorisation.split(" ")[1]
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
     User.findById(decoded.id).exec()
     .then(doc =>{
        const med= new Med({
            _id: new mongoose.Types.ObjectId(),
            type:'Medicines',
            name:req.body.name,
            purpose:req.body.purpose,
            quantity:req.body.quantity,
            expiry:req.body.expiry,
            image:req.file.filename,
            giver:doc.username
        });
        med.save().then(result=>{
            console.log(result);
            res.json({
                message:"Donate meds here",
                "med details":med
            });
    
        }).catch(err=>{
            console.log(err);
            res.json({error:err});
        });
     })
     .catch(err =>{
         console.log(err);
         
     })
    // const med= new Med({
    //     _id: new mongoose.Types.ObjectId(),
    //     type:'Medicines',
    //     name:req.body.name,
    //     purpose:req.body.purpose,
    //     quantity:req.body.quantity,
    //     expiry:req.body.expiry,
    //     image:req.file.filename
    // });
    // med.save().then(result=>{
    //     console.log(result);
    //     res.json({
    //         message:"Donate meds here",
    //         "med details":med
    //     });

    // }).catch(err=>{
    //     console.log(err);
    //     res.json({error:err});
    // });
   
});






module.exports = givemedrouter