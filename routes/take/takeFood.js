const express=require('express');

const takefoodrouter=express.Router();
const {protect}=require('../middleware/authmiddleware');
const User=require('../models/userModel')
const jwt=require("jsonwebtoken");

const Food=require('../models/foodModel');


takefoodrouter.get('/food',protect,(req,res,next)=>{
    const  token=req.headers.authorisation.split(" ")[1]
  const decoded=jwt.verify(token,process.env.JWT_SECRET);
   User.findById(decoded.id).exec()
   .then(doc =>{
    Food.find({giver:{$ne:doc.username}})
    
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
    // Food.find({type:'Food'})
    // .select('_id name quantity expiry image')
    // .exec()
    // .then(data =>{
       
    //     res.json(data);
    // })
    // .catch(err => {
    //     console.log(err);
    //     res.json({error:err});
    // });
   
});

takefoodrouter.get('/food/:foodId',protect,(req,res,next)=>{
    const id=req.params.foodId;
   Food.findById(id).exec()
   .then(doc =>{
       console.log(doc);
       res.json(doc);
   })
   .catch(err =>{
       console.log(err);
       res.json({error:err});
   })
});

takefoodrouter.post('/food/:foodId',protect,(req,res,next)=>{
    const takenfood={
        foodId:req.params.foodId,
        "name":req.body.name,
        "price":req.body.price
    }
    res.json({
        message:"you have successfully  taken food",
        "details":takenfood
    });
});






module.exports = takefoodrouter;