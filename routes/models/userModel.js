const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');


const userSchema=mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    username:{type:String ,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    image:{type:String,required:true},
    registration:{type:Number,required:true,maxlength:8},
    program:{type:String,required:true}
   
});

userSchema.pre("save",async function(next){
    
    if(!this.isModified("password")){
       next();
    }
    
    const salt=await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();

});

userSchema.methods.matchPasswords=async function(password){
    return await bcrypt.compare(password,this.password);
};

userSchema.methods.getSignedToken = function(){
return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})
};


module.exports=mongoose.model('User',userSchema);