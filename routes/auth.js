const express=require('express');
const authRouter=express.Router();
const multer=require('multer');
const path=require('path');
const storage=multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,"userUploads")
    },
    filename:(req,file,cb) =>{
        cb(null, Date.now()+path.extname(file.originalname))
    }
});

const upload=multer({storage:storage});
const {register, login}=require("../controllers/authcontroller");

authRouter.post("/register",upload.single('image'),register);

authRouter.post("/login",login);


module.exports = authRouter;