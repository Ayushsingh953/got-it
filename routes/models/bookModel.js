const mongoose=require('mongoose');

const bookSchema=mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    type:String,
    name:{type:String ,required:true},
    publisher:{type:String, required:true},
    year:{type:Number, required:true},
    image:{type:String},
    giver:{type:String}
    
});

module.exports=mongoose.model('Book',bookSchema);