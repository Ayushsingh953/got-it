const express=require('express');

const takemedrouter=express.Router();
const {protect}=require('../middleware/authmiddleware');
const User=require('../models/userModel')
const jwt=require("jsonwebtoken");


const Med=require('../models/medModel');


takemedrouter.get('/heal',protect,(req,res,next)=>{
    const  token=req.headers.authorisation.split(" ")[1]
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
     User.findById(decoded.id).exec()
     .then(doc =>{
        Med.find({giver:{$ne:doc.username}})
        
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
    // Med.find({type:'Medicines'})
    // .select('_id name quantity purpose expiry image')
    // .exec()
    // .then(data =>{
       
    //     res.json(data);
    // })
    // .catch(err => {
    //     console.log(err);
    //     res.json({error:err});
    // });
   
});

takemedrouter.get('/heal/:medId',protect,(req,res,next)=>{
    const id=req.params.medId;
   Med.findById(id).exec()
   .then(doc =>{
       console.log(doc);
       res.json(doc);
   })
   .catch(err =>{
       console.log(err);
       res.json({error:err});
   })
});
takemedrouter.post('/heal/:medId',protect,(req,res,next)=>{
    const takenmed={
        medId:req.params.medId,
        "name":req.body.name,
        "price":req.body.price
    }
    res.json({
        message:"you have successfully  taken med",
        "details":takenmed
    });
});





module.exports = takemedrouter;