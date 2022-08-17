const mongoose=require('mongoose');

const foodSchema=mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    type:String,
    name:{type:String, required:true},
    quantity:{type:Number, required:true},
    expiry:{type:String, required:true},
    image:{type:String},
    giver:{type:String}
});

module.exports=mongoose.model('Food',foodSchema);