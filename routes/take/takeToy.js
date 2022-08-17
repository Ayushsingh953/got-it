const express=require('express');

const taketoyrouter=express.Router();
const {protect}=require('../middleware/authmiddleware');
const User=require('../models/userModel')
const jwt=require("jsonwebtoken");

const Toy=require('../models/toyModel');


taketoyrouter.get('/play',protect,(req,res,next)=>{
    const  token=req.headers.authorisation.split(" ")[1]
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
     User.findById(decoded.id).exec()
     .then(doc =>{
        Toy.find({giver:{$ne:doc.username}})
    .select('_id name image')
    .exec()
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
    // Toy.find({type:'Toy'})
    // .select('_id name image')
    // .exec()
    // .then(data =>{
       
    //     res.json(data);
    // })
    // .catch(err => {
    //     console.log(err);
    //     res.json({error:err});
    // });
   
});

taketoyrouter.get('/play/:toyId',protect,(req,res,next)=>{
    const id=req.params.toyId;
   Toy.findById(id).exec()
   .then(doc =>{
       console.log(doc);
       res.json(doc);
   })
   .catch(err =>{
       console.log(err);
       res.json({error:err});
   })
});

taketoyrouter.post('/play/:toyId',protect,(req,res,next)=>{
    const takentoy={
        toyId:req.params.toyId,
        "name":req.body.name,
        "price":req.body.price
    }
    res.json({
        message:"you have successfully  taken toy",
        "details":takentoy
    });
});





module.exports = taketoyrouter;