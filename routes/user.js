const express=require('express');
const { protect } = require('./middleware/authmiddleware');
const userrouter=express.Router();
const User=require('./models/userModel')
const jwt=require("jsonwebtoken");
const Book=require('./models/bookModel');
const Cloth=require('./models/clothModel');
const Food=require('./models/foodModel');
const Med=require('./models/medModel');
const Toy=require('./models/toyModel');



userrouter.get("/user",protect,(req,res,next)=>{
  const  token=req.headers.authorisation.split(" ")[1]
  const decoded=jwt.verify(token,process.env.JWT_SECRET);
   User.findById(decoded.id).exec()
   .then(doc =>{
        
       res.json(doc);
   })
   .catch(err =>{
       console.log(err);
       res.json({error:err});
   })
});

userrouter.get("/book",protect,(req,res,next)=>{
    const  token=req.headers.authorisation.split(" ")[1]
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
     User.findById(decoded.id).exec()
     .then(doc =>{
        Book.find({giver:doc.username}).exec()
        .then(data =>{
          console.log(data);
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
     });
   
});

userrouter.get("/cloth",protect,(req,res,next)=>{
    const  token=req.headers.authorisation.split(" ")[1]
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
     User.findById(decoded.id).exec()
     .then(doc =>{
        Cloth.find({giver:doc.username})
    
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
     });
   
});

userrouter.get("/food",protect,(req,res,next)=>{
    const  token=req.headers.authorisation.split(" ")[1]
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
     User.findById(decoded.id).exec()
     .then(doc =>{
        Food.find({giver:doc.username})
    
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
     });
   
});

userrouter.get("/heal",protect,(req,res,next)=>{
    const  token=req.headers.authorisation.split(" ")[1]
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
     User.findById(decoded.id).exec()
     .then(doc =>{
        Med.find({giver:doc.username})
    
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
     });
   
});

userrouter.get("/play",protect,(req,res,next)=>{
    const  token=req.headers.authorisation.split(" ")[1]
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
     User.findById(decoded.id).exec()
     .then(doc =>{
        Toy.find({giver:doc.username})
    
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
     });
   
});

module.exports=userrouter;