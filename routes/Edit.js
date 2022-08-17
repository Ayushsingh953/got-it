const express=require('express');
const editrouter=express.Router();


editrouter.patch('/:productId',(req,res,next)=>{
    res.json({
        message:"update details about the product"
    });
});


editrouter.delete('/:productId',(req,res,next)=>{
    res.json({
        message:"Delete the product"
    });
});


module.exports=editrouter;