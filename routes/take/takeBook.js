const express=require('express');

const takebookrouter=express.Router();
const {protect}=require('../middleware/authmiddleware');
const User=require('../models/userModel')
const jwt=require("jsonwebtoken");

const Book=require('../models/bookModel');

takebookrouter.get('/book',protect,(req,res,next)=>{
    const  token=req.headers.authorisation.split(" ")[1]
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
     User.findById(decoded.id).exec()
     .then(doc =>{
        Book.find({giver:{$ne:doc.username}})
        
        .exec()
        .then(data =>{
          
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.json({error:err});
        });
         
         
     })
    // Book.find({giver:{$ne:}})
    // .select('_id name type publisher year image')
    // .exec()
    // .then(data =>{
      
    //     res.json(data);
    // })
    // .catch(err => {
    //     console.log(err);
    //     res.json({error:err});
    // });
   
});

takebookrouter.get('/book/:bookId',protect,(req,res,next)=>{
    const id=req.params.bookId;
   Book.findById(id).exec()
   .then(doc =>{
       console.log(doc);
       res.json(doc);
   })
   .catch(err =>{
       console.log(err);
       res.json({error:err});
   })
});

takebookrouter.post('/book/:bookId',protect,(req,res,next)=>{
    const takenbook={
        bookId:req.params.bookId,
        "name":req.body.name,
        "price":req.body.price
    }
    res.json({
        message:"you have successfully  taken book",
        "details":takenbook
    });
});





module.exports = takebookrouter;