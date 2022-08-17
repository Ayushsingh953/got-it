const express=require('express');
const mongoose=require('mongoose');
const givebookrouter=express.Router();
const {protect}=require('../middleware/authmiddleware');
const multer=require('multer');
const path=require('path');
const storage=multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,"bookUploads")
    },
    filename:(req,file,cb) =>{
        cb(null, Date.now()+path.extname(file.originalname))
    }
})
const Book=require('../models/bookModel');
const User=require('../models/userModel')
const jwt=require("jsonwebtoken");
const upload=multer({storage:storage});

givebookrouter.post('/book',protect,upload.single('image'),(req,res,next)=>{
    
    const  token=req.headers.authorisation.split(" ")[1]
  const decoded=jwt.verify(token,process.env.JWT_SECRET);
   User.findById(decoded.id).exec()
   .then(doc =>{
    const book=new Book({
        _id: new mongoose.Types.ObjectId(),
        type:'Book',
        name:req.body.name,
        publisher:req.body.publisher,
        year:req.body.year,
       image:req.file.filename,
       giver:doc.username
     
    });
    book.save().then(result=>{
        console.log(result);
        res.json({
           message:"Donate books here",
           "Book details":book
       });

    }).catch(err=>{
        console.log(err);
        res.json({error:err});
    });
   })
   .catch(err =>{
       console.log(err);
      
   })
    

    //  const book=new Book({
    //      _id: new mongoose.Types.ObjectId(),
    //      type:'Book',
    //      name:req.body.name,
    //      publisher:req.body.publisher,
    //      year:req.body.year,
    //     image:req.file.filename,
    //     //"Donated by":user.username
      
    //  });
    //  book.save().then(result=>{
    //      console.log(result);
    //      res.json({
    //         message:"Donate books here",
    //         "Book details":book
    //     });

    //  }).catch(err=>{
    //      console.log(err);
    //      res.json({error:err});
    //  });
   
});





module.exports = givebookrouter;