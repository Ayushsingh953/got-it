const express=require('express');

const takeclothrouter=express.Router();
const {protect}=require('../middleware/authmiddleware');
const User=require('../models/userModel')
const jwt=require("jsonwebtoken");

const Cloth=require('../models/clothModel');


takeclothrouter.get('/cloth',protect,(req,res,next)=>{
    const  token=req.headers.authorisation.split(" ")[1]
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
     User.findById(decoded.id).exec()
     .then(doc =>{
          
        Cloth.find({giver:{$ne:doc.username}})
       
        .then(data =>{
          
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.json({error:err});
        });
     })
     .catch(err =>{
         console.log(err);
         res.json({error:err});
     })
    // Cloth.find({type:'Cloth'})
    // .select('_id name size gender image')
    // .exec()
    // .then(data =>{
      
    //     res.json(data);
    // })
    // .catch(err => {
    //     console.log(err);
    //     res.json({error:err});
    // });
   
});

takeclothrouter.get('/cloth/:clothId',protect,(req,res,next)=>{
    const id=req.params.clothId;
   Cloth.findById(id).exec()
   .then(doc =>{
       console.log(doc);
       res.json(doc);
   })
   .catch(err =>{
       console.log(err);
       res.json({error:err});
   })
});



takeclothrouter.post('/cloth/:clothId',protect,(req,res,next)=>{
    const takencloth={
        clothId:req.params.clothId,
        "name":req.body.name,
        "price":req.body.price
    }
    res.json({
        message:"you have successfully  taken cloth",
        "details":takencloth
    });
});





module.exports = takeclothrouter;