const mongoose=require('mongoose');

const clothSchema=mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    type:{type:String,required:true},
    name:{type:String, required:true},
    size:{type:String, required:true},
    gender:{type:String, required:true},
    image:{type:String},
    giver:{type:String}
    
});

module.exports=mongoose.model('Cloth',clothSchema);