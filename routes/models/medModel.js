const mongoose=require('mongoose');

const medSchema=mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    type:String,
    name:{type:String, required:true},
    purpose:{type:String, required:true},
    quantity:{type:Number,required:true},
    expiry:{type:String, required:true},
    image:{type:String},
    giver:{type:String}
});

module.exports=mongoose.model('Med',medSchema);