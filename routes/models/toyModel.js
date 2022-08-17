const mongoose=require('mongoose');

const toySchema=mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    type:String,
    name:{type:String, required:true},
    image:{type:String},
    giver:{type:String}
    
});

module.exports=mongoose.model('Toy',toySchema);