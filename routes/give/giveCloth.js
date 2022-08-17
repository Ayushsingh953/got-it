const express=require('express');
const mongoose=require('mongoose');
const giveclothrouter=express.Router();
const {protect}=require('../middleware/authmiddleware');
const multer=require('multer');
const path=require('path');
const storage=multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,"clothUploads")
    },
    filename:(req,file,cb) =>{
        cb(null, Date.now()+path.extname(file.originalname))
    }
})

const Cloth=require('../models/clothModel');
const User=require('../models/userModel')
const jwt=require("jsonwebtoken");
const upload=multer({storage:storage});

giveclothrouter.post('/cloth',protect,upload.single('image'),(req,res,next)=>{
   
    const  token=req.headers.authorisation.split(" ")[1]
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
     User.findById(decoded.id).exec()
     .then(doc =>{
        const cloth=new Cloth({
            _id: new mongoose.Types.ObjectId(),
            type:'Cloth',
            name:req.body.name,
            size:req.body.size,
            gender:req.body.gender,
            image:req.file.filename,
            giver:doc.username
        });
        cloth.save().then(result=>{
            console.log(result);
            res.json({
                message:"Donate clothes here",
                "cloth details":cloth
            });
    
        }).catch(err=>{
            console.log(err);
            res.json({error:err});
        });
     })
     .catch(err =>{
         console.log(err);
        
     })
    // const cloth=new Cloth({
    //     _id: new mongoose.Types.ObjectId(),
    //     type:'Cloth',
    //     name:req.body.name,
    //     size:req.body.size,
    //     gender:req.body.gender,
    //     image:req.file.filename
    // });
    // cloth.save().then(result=>{
    //     console.log(result);
    //     res.json({
    //         message:"Donate clothes here",
    //         "cloth details":cloth
    //     });

    // }).catch(err=>{
    //     console.log(err);
    //     res.json({error:err});
    // });
   
});






module.exports = giveclothrouter;